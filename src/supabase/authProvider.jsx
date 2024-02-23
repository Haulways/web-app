import { supabaseAuthProvider } from "ra-supabase";
import { supabase } from "./SupabaseConfig";
import { useStore } from "react-admin";

// const [user, setUser] = useStore('user');


export const authProvider = supabaseAuthProvider(supabase, {
    
    getIdentity: async user => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .match({ email: user.email })
            .single();

        if (!data || error) {
            throw new Error();
        }

        console.log(data);
        // setUser(data);

        return data;
          
    },
});