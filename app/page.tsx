import Pricing from '@/components/Pricing';
import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices
} from '@/app/supabase-server';
import Link from 'next/link';
import ChatWindow from '../components/ChatWindow';
import HomePageGenerator from '../components/HomePageGenerator';
import mealIcon from '../meal-icon.png';

export default async function PricingPage() {
  const [session, products, subscription] = await Promise.all([
    getSession(),
    getActiveProductsWithPrices(),
    getSubscription()
  ]);

  return (
    <div className='h-screen bg-black'>
      <div className="mx-auto py-8 sm:pt-32 px-4 sm:px-6 lg:px-8">
        <div className="mt-8 sm:align-center ">
          <p className="text-7xl font-extrabold text-white sm:text-center sm:text-8xl  m-auto">
            Track. <span className="blue-gradient-text">Learn.</span> Improve.
          </p>
        </div>
        <div>
          <p className="mt-9 mb-14 text-xl text-gray-500 sm:text-center sm:text-2xl max-w-4xl m-auto">
            Your tailored health and fitness companion. Personalized mealplans, real-time tracking, and support.
          </p>
        </div>
      </div>

      <div className="bg-black pb-6 px-8">
        <div className="rounded-full pill-bg flex items-center border w-md h-20 border-gray-600 max-w-md mx-auto ">
          <Link
            href="/waitlist"
            className="flex p-3 w-full">
            <div className="w-1/4 flex justify-center sm:pr-2">
              <div className="circle-div"><img src={mealIcon.src} alt="meal image" />
              </div>
            </div>
            <div className="w-11/20 sm:pl-4 flex w-full flex-col">

              <div className="h-1/2 relative ">
                <p className="pl-6 text-white absolute bottom-0">
                  Introducing Fitpal Planner
                </p>
              </div>
              <div className="h-1/2 relative">
                <p className=" pl-6 absolute top-0 text-gray-600">
                  Create account to customize
                </p>
              </div>
            </div>
            <div className=" flex items-center justify-center w-1/5 ">
              <svg className="w-3 h-3 text-white hover:text-blue-500 text-dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
              </svg>
            </div>

          </Link>

        </div>
      </div>
      <div className='p-3 bg-black pb-6 mt-6'>
        <HomePageGenerator />
      </div>
    </div>
  );
}
