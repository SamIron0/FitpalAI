import { MealPlan, SurveyResponse, UserDetails } from '@/types';
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

const logClick = async (name: string) => {
  const { data: existingClick } = await supabaseAdmin
    .from('clicks')
    .select('name, count')
    .eq('name', name)
    .single();

  if (existingClick) {
    await supabaseAdmin
      .from('clicks')
      .update({ count: existingClick.count + 1 })
      .eq('name', name);
  } else {
    await supabaseAdmin.from('clicks').insert([{ name, count: 1 }]);
  }
};
const createWaitListContact = async (userName: string, userEmail: string) => {
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

export async function createSurveyResponse(response: SurveyResponse) {
  const { data, error: supabaseError } = await supabaseAdmin
    .from('survey_responses')
    .insert([
      {
        id: uuidv4(),
        response: response.response,
        user_id: response.user_id
      }
    ]);

  if (supabaseError) throw supabaseError;
  console.log(`New survey response inserted for ${response.user_id}.`);
  return emailCount;
}

const isSurveyComplete = async (id: string) => {
  const { data, error } = await supabaseAdmin
    .from('survey_responses')
    .select()
    .eq('user_id', id);

  return data && data?.length > 0;
};

const retrieveMealPlans = async (user_id: string, date: Date) => {
  const { data, error: supabaseError } = await supabaseAdmin
    .from('mealplans')
    .select()
    .eq('owner', user_id)
    .eq('date', date);

  return data;
};


const deleteMealPlan = async (mealPlan: MealPlan) => {
  const { data, error: supabaseError } = await supabaseAdmin
    .from('mealplans')
    .delete()
    .eq('owner', mealPlan.owner)
    .eq('date', mealPlan.date);
};
const createMealPlan = async (mealPlan: MealPlan) => {
  // delete meal plan for this date if it exists
  deleteMealPlan(mealPlan);
  //then insert
  console.log('saving', mealPlan);
  const { data, error: supabaseError } = await supabaseAdmin
    .from('mealplans')
    .insert([
      {
        id: uuidv4(),
        owner: mealPlan.owner,
        meals: mealPlan.meals,
        date: mealPlan.date
      }
    ]);
  if (supabaseError) {
    throw supabaseError;
  }
  console.log(`New mealplan inserted for ${mealPlan.owner}.`);
  return data;
};

const createQuery = async (query: string, user_id: string, result: any) => {
  const { data, error: supabaseError } = await supabaseAdmin
    .from('queries')
    .insert([
      {
        id: uuidv4(),
        query: query,
        user_id: user_id,
        result: result
      }
    ]);
    console.log(`New query inserted ${data}.`);
    if (supabaseError) {
    throw supabaseError;
  }
  return data;
};

export const upsertUserDetails = async (userDetails: UserDetails) => {
  console.log('saving', userDetails.id);
  const { data, error: supabaseError } = await supabaseAdmin
    .from('users')
    .update(userDetails)
    .match({ id: userDetails.id });
  console.log('data', data);
  console.log('supabaseError', supabaseError);
  if (supabaseError) throw supabaseError;
  return data;
};

export const getUserDetails = async (id: string) => {
  const { data, error: supabaseError } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (supabaseError) throw supabaseError;
  return data;
};
export {
  createMealPlan,
  retrieveMealPlans,
  isSurveyComplete,
  createWaitListContact,
  logClick,
  createQuery
};
