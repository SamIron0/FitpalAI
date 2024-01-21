import { MealPlan } from '@/types';
import { toDateTime } from './helpers';
import { createClient } from '@supabase/supabase-js';
import type { Database } from 'types_db';
import { v4 as uuidv4 } from 'uuid';

type Product = Database['public']['Tables']['products']['Row'];
type Price = Database['public']['Tables']['prices']['Row'];

// Note: supabaseAdmin uses the SERVICE_ROLE_KEY which you must only use in a secure server-side context
// as it has admin privileges and overwrites RLS policies!
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);
let emailCount = 0;

const createOrRetrieveWaitListContact = async (
  userName: string,
  userEmail: string
) => {
  const { data, error: supabaseError } = await supabaseAdmin
    .from('contacts')
    .insert([
      {
        id: uuidv4(),
        name: userName,
        email: userEmail
      }
    ]);
  if (supabaseError) throw supabaseError;
  console.log(`New contact inserted for ${userName}.`);
  return emailCount;
};

const createOrRetrieveMealPlan = async (
  mealPlan: MealPlan,
  owner_id: string,
  planName: string,
  planDescription: string
) => {
  const { data, error: supabaseError } = await supabaseAdmin
    .from('mealplans')
    .insert([
      {
        id: 'here',
        meals: mealPlan.meals,
        owner: owner_id
      }
    ]);
  if (supabaseError) throw supabaseError;
  console.log(`New mealplan inserted for}.`);
  return mealPlan.id;
};

export { createOrRetrieveMealPlan, createOrRetrieveWaitListContact };
