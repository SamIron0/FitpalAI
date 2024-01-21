'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from './Navbar';
import HomePageGenerator from '../HomePageGenerator';
import { User } from '@supabase/supabase-js';
import Sidebar from './Sidebar';
import Header from '../Header';
import Container from '../Container';
import { GhostCard } from '../HomePageGenerator';
interface DashBoardProps {
  user: User | null;
}
const DashBoard = ({ user }: DashBoardProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  const [calories, setCalories] = useState('');

  return (
    <div className="flex w-full justify-center  bg-zinc-900 h-screen overflow-hidden">
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <div className="p-5 w-full mb-5 border-b items-center pl-5 text-2xl text-semibold  border-zinc-800">
          Welcome back, Samuel
        </div>
        <div className=" p-4 max-w-3xl flex justify-center md:p-6">
          <div className="flex w-full flex-col justify-center">
            <div className="flex w-full  flex-col justify-center pb-6">
              <p className="text-4xl flex justify-center pt-12 text-semibold pb-6">
                Create a Plan
              </p>
              <input
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className=" px-2 w-full h-[60px] focus:outline-none bg-transparent border-[1px] border-[#232325] text-md rounded-md "
                placeholder="How many calories"
              />
            </div>
            <div className="flex pb-16 justify-center">
              <span
                className="text-xs inline-flex font-medium items-center px-2.5 py-0.5 rounded-lg me-2 bg-transparent text-gray-400 border border-gray-500"
                style={{ whiteSpace: 'nowrap' }}
              >
                <svg
                  className="w-2.5 h-2.5 me-1.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                </svg>
                Make me a plan for dinner
              </span>
              <span
                className="text-xs font-medium inline-flex  items-center px-2.5 py-0.5 rounded-lg me-2 bg-transparent text-gray-400 border border-gray-500"
                style={{ whiteSpace: 'nowrap' }}
              >
                <svg
                  className="w-2.5 h-2.5 me-1.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                </svg>
                Make me a meal plan for tomorrow
              </span>
              <span
                className="text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-lg me-2 bg-transparent text-gray-400 border border-gray-500"
                style={{ whiteSpace: 'nowrap' }}
              >
                <svg
                  className="w-2.5 h-2.5 me-1.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                </svg>
                What should I eat for lunch
              </span>
            </div>

            <Container>
              <div className="flex w-full justify-between">
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

              <GhostCard />
              <GhostCard />
              <GhostCard />
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
                <span className="relative w-lg px-6 text-left transition-colors duration-200 ease-in-out group-hover:text-white">
                  Save Plan
                </span>
              </a>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashBoard;
