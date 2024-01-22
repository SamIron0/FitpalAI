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
              <p className="mt-9 mb-9 px-4 text-l text-zinc-500 text-center sm:text-xl max-w-3xl sm:max-w-2xl m-auto">
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
            <div className="w-full pt-24 flex justify-center items-center">
              <figure className="border-1 border-zinc-600 relative z-[1] max-w-full w-[50rem] h-auto rounded-b-lg shadow-[0_2.75rem_3.5rem_-2rem_rgb(45_55_75_/_20%),_0_0_5rem_-2rem_rgb(45_55_75_/_15%)] dark:shadow-[0_2.75rem_3.5rem_-2rem_rgb(0_0_0_/_20%),_0_0_5rem_-2rem_rgb(0_0_0_/_15%)]">
                <div className="relative flex items-center max-w-[50rem] bg-zinc-800 rounded-t-lg py-2 px-24 dark:bg-zinc-700">
                  <div className="flex space-x-1 absolute top-2/4 start-4 -translate-y-1">
                    <span className="w-2 h-2 bg-zinc-600 rounded-full dark:bg-zinc-600"></span>
                    <span className="w-2 h-2 bg-zinc-600 rounded-full dark:bg-zinc-600"></span>
                    <span className="w-2 h-2 bg-zinc-600 rounded-full dark:bg-zinc-600"></span>
                  </div>
                  <div className="flex justify-center items-center w-full h-full bg-zinc-700 text-[.25rem] text-zinc-400 rounded-sm sm:text-[.5rem] dark:bg-zinc-600 dark:text-zinc-400">
                    www.fitpalai.com
                  </div>
                </div>

                <div className="bg-zinc-800 rounded-b-lg">
                  <img
                    className="max-w-full h-auto rounded-b-lg"
                    src="mockup1.png"
                    alt="ImageMockup"
                  />
                </div>
              </figure>
            </div>
          <Footer />
        </div>
      </>
    );
  } else {
    redirect('/dashboard');
  }
}
