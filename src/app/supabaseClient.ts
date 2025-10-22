// src/app/supabaseClient.ts
import { createClient} from '@supabase/supabase-js';
import { environment } from './environment/environment';

export const supabase = createClient(
  environment.supabaseUrl,
  environment.supabaseKey,
{
    auth: {
    persistSession: false,
    autoRefreshToken: false, 
    detectSessionInUrl: false, 
    storageKey: 'supabase-no-lock',
    storage: {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
        },
    },
    global: {
        fetch: (...args) => fetch(...args)
    },

});

