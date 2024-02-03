import { NextApiHandler } from 'next';
import { createOrRetrieveMealPlan } from '@/utils/supabase-admin';
import { createServerSupabaseClient } from '@/app/supabase-server';

const SaveMealPlan: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { mealplan } = req.body;
    try {
      const supabase = createServerSupabaseClient({ req, res });
      const {
        data: { session }
      } = await supabase.auth.getSession();

      if (!session)
        return res.status(401).json({
          error: 'not authenticatedd',
          description:
            'The user does not have an active session or is not authenticated'
        });
      mealplan.owner = session.user.id;

      const mealPlanId = createOrRetrieveMealPlan(mealplan);
      if (mealPlanId != undefined) {
        const response = 'Meal plan saved';
        res.status(200).json(response);
      }
    } catch (err: any) {
      console.log(err);
      res
        .status(500)
        .json({ error: { statusCode: 500, message: err.message } });
    }
  } else {
    res.status(401).end('Method Not Allowed');
  }
};
export default SaveMealPlan;
