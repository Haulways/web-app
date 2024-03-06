import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { supabaseAuthProvider } from "ra-supabase";
import { ReactNode, createContext, useContext, useEffect } from "react";
import { useRedirect, useResetStore, useStore } from "react-admin";
import { Routes } from "../../routes";
import { User, User_Medusa } from "../../types/database.types";
import { supabaseClient } from "../services/supabase";
import useAlert from "../hooks/use-alert";
import { medusaClient } from "../services/medusa";

export const USER_SUPABASE = "USER_SUPABASE";
export const USER_MEDUSA = "USER_MEDUSA";

export const authProvider = supabaseAuthProvider(supabaseClient, {
  getIdentity: async (user) => {
    const { data, error } = await supabaseClient
      .from("users")
      .select("*")
      .match({ email: user.email })
      .single();

    if (!data || error) {
      throw new Error("User not found");
    }

    return data;
  },
});

interface AuthContextProps {
  supabaseUser: User | undefined;
  medusaUser: User_Medusa | undefined;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (
    first_name: string,
    last_name: string,
    email: string,
    password: string,
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const redirect = useRedirect();
  const reset = useResetStore();
  const { state, open: openAlert, close: closeAlert, Alert } = useAlert();
  const [supabaseUser, setSupabaseUser] = useStore<User | undefined>(
    USER_SUPABASE,
  );
  const [medusaUser, setMedusaUser] = useStore<User_Medusa | undefined>(
    USER_MEDUSA,
  );

  // get supabase user identity
  const getUser = async () => {
    if (authProvider.getIdentity === undefined) return;
    const data = (await authProvider.getIdentity()) as User;
    setSupabaseUser(data);
  };

  // handle signup authentication request
  const handleSignup = async (
    first_name: string,
    last_name: string,
    email: string,
    password: string,
  ) => {
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name,
          last_name,
        },
      },
    });

    if (data.user?.identities && data.user.identities.length === 0) {
      throw new Error("already signed up, sign in instead?");
    }

    if (error) {
      throw new Error(error.message);
    }

    if (data.user) {
      const { user, response } = await medusaClient.admin.users.create({
        email,
        password,
        first_name,
        last_name,
        role: "member",
      });

      if (
        response.status.toString().charAt(0) === "4" ||
        response.status.toString().charAt(0) === "5"
      ) {
        await supabaseClient.auth.admin.deleteUser(data.user.id ?? "");
        await medusaClient.admin.users.delete(user.id ?? "");
        return;
      }

      redirect(Routes.AUTH_LOGIN_ROUTE);
    }
  };

  // handle login authentication request
  const handleLogin = async (email: string, password: string) => {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (data.user) {
      const { user } = await medusaClient.admin.auth.createSession({
        email,
        password,
      });

      if (user) {
        const { data: _supabaseUser } = await supabaseClient
          .from("users")
          .select("*")
          .match({ email: data.user.email })
          .single();

        const { data: _medusaUser } = await supabaseClient
          .from("user")
          .select("*")
          .match({ email: data.user.email })
          .single();

        if (_supabaseUser && _medusaUser) {
          setSupabaseUser(_supabaseUser);
          setMedusaUser(_medusaUser);
          redirect(Routes.ORDERS_ROUTE);
        }
      } else {
        await medusaClient.admin.auth.deleteSession();
        await supabaseClient.auth.signOut();
      }
    }
  };

  // log out current user
  const handleLogout = async () => {
    await medusaClient.admin.auth.deleteSession();
    const { error } = await supabaseClient.auth.signOut();
    reset();
    if (error?.message) {
      throw new Error(error.message);
    }
  };

  // revalidate user credentials
  const revalidateUser = async (
    event: AuthChangeEvent,
    session: Session | null,
  ) => {
    if (event === "SIGNED_IN") {
      const userSession = session?.user;

      if (userSession === undefined) {
        handleLogout();
        throw new Error("User not found");
      }

      const { data: _supabaseUser, error } = await supabaseClient
        .from("users")
        .select("*")
        .match({ email: userSession.email })
        .single();

      if (_supabaseUser) {
        setSupabaseUser(_supabaseUser);
        await supabaseClient
          .from("users")
          .update({
            id: userSession.id,
            uid: userSession.id,
          })
          .match({ email: userSession.email })
          .select();

        const { user } = await medusaClient.admin.auth.getSession();
        if (user) {
          setMedusaUser(user as unknown as User_Medusa);
        } else {
          handleLogout();
        }
      } else {
        // Create the user document
        const { data, error } = await supabaseClient
          .from("users")
          .insert({ ...userSession, timestamp: new Date().toJSON() })
          .select();
        if (data) setSupabaseUser(data as unknown as User);
      }

      // console.log("User signed in:", userSession);
    } else if (event === "SIGNED_OUT") {
      console.log("User signed out");
      reset();
      redirect(Routes.AUTH_LOGIN_ROUTE);
    }
  };

  useEffect(() => {
    // handleLogout()
    getUser();
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        revalidateUser(event, session);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        supabaseUser,
        medusaUser,
        login: handleLogin,
        logout: handleLogout,
        signup: handleSignup,
      }}
    >
      {children}

      <span className="fixed right-3 top-3 z-30">
        <Alert />
      </span>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
