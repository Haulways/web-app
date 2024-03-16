import { createContext, useEffect, useState } from "react";
import { supabase } from "../../supabase/SupabaseConfig";
import { supabaseAuthProvider } from "ra-supabase";
import Medusa from "@medusajs/medusa-js";
import { useDataProvider, useStore } from "react-admin";
import { useGetIdentity, useGetOne } from 'react-admin';

import { useMeCustomer, useMedusa } from "medusa-react"


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
  const [g_user, setG_User] = useStore("user");
  const [user, setUser] = useState(null);
  const [custData, setCustData] = useStore("customer");
  const [cart_id, setCartID] = useStore("cart_id");
  
  
  // const useFetchMultipleLists = (resources) => {
	// 	const dataProvider = useDataProvider();
	// 	const [data, setData] = React.useState([]);
  //   const [haulsList, setHaulsList] = React.useState([]);
	// 	const [loading, setLoading] = React.useState(true);
	// 	const [error, setError] = React.useState(null);
  //   const [h_loading, setH_Loading] = React.useState(true);
	// 	const [h_error, setH_Error] = React.useState(null);

	// 	React.useEffect(() => {
	// 		const fetchResources = async () => {
	// 			try {
	// 				const dataPromises = resources.map((resource) =>
	// 					dataProvider.getList(resource, {
	// 						pagination: { page: 1, perPage: 1000 },
	// 						sort: { field: "id", order: "ASC" },
	// 						filter: {},
	// 					})
	// 				);

	// 				const results = await Promise.all(dataPromises);
	// 				const seenIds = new Set();
	// 				const combinedData = results.reduce((acc, { data }) => {
	// 					const uniqueData = data.filter((item) => {
	// 						if (!seenIds.has(item.id)) {
	// 							seenIds.add(item.id);
	// 							return true;
	// 						}
	// 						return false;
	// 					});
	// 					return [...acc, ...uniqueData];
	// 				}, []);

  //         const seenHaulIds = new Set();
  //         const haulsData = results[resources.indexOf("hauls")].reduce((acc, { data }) => {
	// 					const uniqueData = data.filter((item) => {
	// 						if (!seenHaulIds.has(item.id)) {
	// 							seenHaulIds.add(item.id);
	// 							return true;
	// 						}
	// 						return false;
	// 					});
	// 					return [...acc, ...uniqueData];
	// 				}, []);

  //         setHaulsList(haulsData);
	// 				setData(combinedData);
	// 			} catch (e) {
	// 				setError(e);
	// 			} finally {
	// 				setLoading(false);
	// 			}
	// 		};

	// 		fetchResources();
	// 	}, [dataProvider, resources]);

	// 	return { data, haulsList, loading, error };
	// };

	// const tables = ["posts", "hauls", "lookbook", "diy", "grwm"];
	// const { data, haulsList, loading } = useFetchMultipleLists(tables);
  
  

  useEffect(() => {
    // Call your authProvider here and update the state
    auth.getIdentity().then(data => setCurrentUser(data));

  }, []);

  useEffect(() => {
    // console.log(currentUser)
    if (currentUser && currentUser.email) {
      setG_User(currentUser)
      medusa.auth
        .authenticate({
          email: currentUser.email,
          password: import.meta.env.VITE_AUTH_PASSWORD,
        }).then((customer)=>{
          console.log('Signed into medusa')
        })
    }
    else {
      if (g_user && g_user.email) {
        setCurrentUser(g_user)
        medusa.auth
          .authenticate({
            email: currentUser.email,
            password: import.meta.env.VITE_AUTH_PASSWORD,
          }).then((customer)=>{
            console.log('Signed into medusa')
          })
      }
    }
    if (user) {
      setG_User(user)
    }
    else {
      if (g_user) {
        setUser(g_user)
      }
    }


  }, [currentUser, user, g_user])




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
      if (authListener) {
        authListener.unsubscribe();
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, medusa }}>
      {children}
    </AuthContext.Provider>
  );
};
