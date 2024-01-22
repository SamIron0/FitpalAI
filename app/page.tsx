import Link from 'next/link';
import mealIcon from '../meal-icon.png';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Sidebar from '@/components/ui/Sidebar';
import { getSession } from './supabase-server';
import { useSupabase } from './supabase-provider';
import { redirect } from 'next/navigation';
import Container from '@/components/Container';
export default async function Home() {
  const session = await getSession();
  if (!session) {
    return (
      <>
        <div className=" bg-black ">
          <div className="mx-auto py-8 sm:pt-12 px-4 sm:px-6 lg:px-8">
            <div className="mt-8 align-center ">
              <p className="text-5xl font-extrabold text-white text-center sm:text-7xl max-w-2xl m-auto">
                The most{' '}
                <span className="blue-gradient-text">customizable</span> meal
                generator
              </p>
            </div>
            <div>
              <p className="mt-9 mb-9 px-4 text-l text-gray-500 text-center sm:text-xl max-w-3xl sm:max-w-2xl m-auto">
                FitpalAI lets you create and customize personalized meals based
                on your preferences, budget and what you already have in stock.
                Reach your nutritional goals with your new pal{' '}
              </p>
            </div>
          </div>
          <div className="pb-6 px-8">
            <div className="rounded-full border-[#232325] bg-[#0D0D0E] flex items-center border  h-12  sm:w-[370px] w-[358px] mx-auto ">
              <Link href="/waitlist" className="flex p-3 w-full ">
                <div className="w-1/4 flex justify-start pl-0.5 pr-0.5 ">
                  <div className="circle-div">
                    <img src={mealIcon.src} alt="meal image" />
                  </div>
                </div>
                <div className="w-11/20 justify-center items-center pl-1 flex w-full flex-col">
                  <p className=" text-white text-sm absolute">
                    Introducing FitpalAI - Join Waitlist
                  </p>
                </div>
                <div className=" flex items-center justify-end pr-2 w-1/5 ">
                  <svg
                    className="w-3 h-3 text-white hover:text-blue-500 text-dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 8 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
          <div className="w-full p-24 flex justify-center items-center">
            <div className="rounded-lg overflow-hidden w-full border-[1px] border-zinc-600">
              <img src={'/mockup1.png'} alt="mockup image" />
            </div>
          </div>
          <div>
            </ div>
          <Footer />

        </div>
      </>
    );
  } else {
    redirect('/dashboard');
  }
}
