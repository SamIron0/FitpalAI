'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from './Navbar';
import HomePageGenerator from '../HomePageGenerator';
import { User } from '@supabase/supabase-js';
import Sidebar from './Sidebar';
import Header from '../Header';
import Container from '../Container';
interface DashBoardProps {
  user: User | null;
}
const DashBoard = ({ user }: DashBoardProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div className="flex w-full justify-center  bg-gray-800 h-screen overflow-hidden">
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <div className="p-5 w-full mb-10 border-b items-center pl-5 text-2xl text-semibold  border-zinc-500">
          Welcome back, Samuel
        </div>
        <div className=" p-4 md:p-6 2xl:p-10">
          <Container>
            <div className="flex w-full mx-4 justify-between">
              <div className="">Refresh</div>
              <div className="relative justify-center h-[45px]  bg-zinc-900 rounded-lg p-0.5 flex border border-zinc-800">
                <button
                  type="button"
                  className="ml-0.5 relative w-1/2 border border-transparent text-zinc-400 rounded-md m-1 text-sm font-medium whitespace-nowrap focus:outline-none focus:z-10  sm:px-8"
                >
                  Day
                </button>
                <button
                  type="button"
                  className="ml-0.5 relative w-1/2 border border-transparent text-zinc-400               rounded-md m-1  text-sm font-medium whitespace-nowrap focus:outline-none focus:z-10  sm:px-8"
                >
                  Week
                </button>
              </div>
            </div>
          </Container>

          <div className="w-full pt-4 md:grid md:grid-cols-2 md:gap-4 ">
            <Container>
              <div className="flex items-center w-lg justify-between">
                Preferences
              </div>
            </Container>

            <Container>Pantry</Container>
          </div>
          <div className="md:flex pt-4md:justify-between gap-4 ">
            <Container>
              <div>Calories</div>
            </Container>
            <Container>
              <a
                href="#_"
                className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-blue-500 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group"
              >
                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-blue-500 group-hover:h-full"></span>
                <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                  <svg
                    className="w-5 h-5 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                  <svg
                    className="w-5 h-5 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="relative w-lg text-left transition-colors duration-200 ease-in-out group-hover:text-white">
                  Generate
                </span>
              </a>
            </Container>{' '}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashBoard;
