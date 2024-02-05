import { createContext, useEffect, useState } from "react";
import { supabase } from "../../supabase/SupabaseConfig";
import { supabaseAuthProvider } from "ra-supabase";
import Medusa from "@medusajs/medusa-js";
import { useStore } from "react-admin";


const auth = supabaseAuthProvider(supabase, {
  getIdentity: async user => {
      const { data, error } = await supabase
          .from('users')
          .select('*')
          .match({ email: user.email })
          .single();

      if (!data || error) {
          throw new Error();
      }

      return data;
        
  },
});

const medusa = new Medusa({
  maxRetries: 3,
  baseUrl: "https://ecommerce.haulway.co",
});

export const AuthContext = createContext();

//Create our Provider

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  
  const [user, setUser] = useState(null);
  const [custData, setCustData] = useStore("customer");
  const [cart_id, setCartID] = useStore("cart_id");


  useEffect(() => {
    // Call your authProvider here and update the state
    auth.getIdentity().then(data => setCurrentUser(data));
    
  }, []);
 
  
  

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        // The session object contains information about the current user
        const userData = session.user;
        setUser(userData)

        // console.log(userData);
        const { data: users, error } = await supabase
          .from('users')
          .select('*')
          .match({ email: userData.email })
          .single();
        
    
        if (!users) {
          // Create the user document
          await supabase
            .from('users')
            .insert({
              id: userData.id,
              uid: userData.id,
              photoURL: userData ? userData.user_metadata.avatar_url : null,
              bio: "",
              timestamp: new Date(),
              displayName: userData?.user_metadata?.displayName ?? userData?.user_metadata?.full_name,
              username: "",
              email: userData.email,
              phone: "",
              country: "",
              followers: [],
              following: [],
              // Add any other user fields here
            })
            .select()
        } else {
          await supabase
            .from('users')
            .update({
              id: userData.id,
              uid: userData.id
            })
            .match({ email: userData.email })
            .select()
        }


        

        medusa.customers.create({
          email: userData.email,
          password: import.meta.env.VITE_AUTH_PASSWORD,
          first_name: userData.user_metadata.displayName,
          last_name: userData.user_metadata.full_name
        })
          .then(customer => {
            // Authenticate the customer
            return medusa.auth.authenticate({
              email: customer.email,
              password: import.meta.env.VITE_AUTH_PASSWORD,
            });
          })
          .then(({ customer }) => {
            console.log(customer);
            setCustData(customer);

            if (!cart_id) {
              medusa.carts.create().then(({ cart }) => {
                setCartID(cart.id);
                console.log(cart_id);
              });
            }
          });
        


        console.log('User signed in:', userData);
      } else if (event === 'SIGNED_OUT') {
        console.log('User signed out');
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser}}>
      {children}
    </AuthContext.Provider>
  );
};
