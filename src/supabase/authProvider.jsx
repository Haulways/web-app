import { supabaseAuthProvider } from "ra-supabase";
import { supabase } from "./SupabaseConfig";

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
        return data;
          
    },
});