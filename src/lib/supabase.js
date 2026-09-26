// Crátion de la connexion entre React et Supabase

import { createClient } from "@supabase/supabase-js"; //Librairie

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey); // export pour l'utiliser dans le projet via supabase.from('...')
