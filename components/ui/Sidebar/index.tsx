'use client';
import React, { useEffect, useRef, useState } from 'react';
import { TbFridge } from 'react-icons/tb';

import { BiMenuAltLeft } from 'react-icons/bi';

import { TiHeartOutline } from 'react-icons/ti';
import { IoSaveOutline } from 'react-icons/io5';
import { useSidebar } from '@/app/providers/SideBarContext';
import { Session } from '@supabase/supabase-js';

interface SidebarProps {
  session: Session;
}
const Sidebar = ({ session }: SidebarProps) => {
  const { isSidebarOpen, setSidebarOpen } = useSidebar();
  const disabled =
    session.user.email === 'fitpalaicontact@gmail.com' ? false : true;
  return (
    <>
      {!isSidebarOpen ? (
        <div className="absolute left-2 z-50">
          <button
            className="p-2"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <BiMenuAltLeft className="w-8 h-8 text-zinc-400" />
          </button>
        </div>
      ) : (
        <div
          className={`transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-200 ease-in-out fixed inset-y-0 left-0 z-50  h-full bg-black overflow-y-auto`}
        >
          {isSidebarOpen && (
            <div className='h-screen '>
              <button
                className="p-2 pt-2 flex flex-col items-center w-full"
                onClick={() => setSidebarOpen(!isSidebarOpen)}
              >
                <BiMenuAltLeft className="w-8 h-8 text-gray-200" />
              </button>

              <aside className="flex flex-col h-full items-center w-16 py-8 overflow-y-auto border-r rtl:border-l rtl:border-r-0 bg-black border-black">
                <nav className="flex flex-col flex-1 space-y-6">
                  <a href={disabled ? '#' : '/dashboard'}>
                    <img
                      className="w-[37px] h-[37px]"
                      src="/logo-2.svg"
                      alt=""
                    />
                  </a>

                  <a
                    href={disabled ? '#' : '/dashboard'}
                    className="p-1.5 text-gray-200 flex justify-center focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-zinc-800 "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                  </a>

                  <a
                    href={disabled ? '#' : '/pantry'}
                    className="p-1.5 flex justify-center focus:outline-nones transition-colors duration-200 rounded-lg text-gray-200 hover:bg-zinc-800 "
                  >
                    <TbFridge
                      className="w-6 h-6 hover:text-gray-200 "
                      color="white"
                    />
                  </a>

                  <a
                    href={disabled ? '#' : '/preferences'}
                    className="p-1.5 text-gray-200 flex justify-center focus:outline-nones transition-colors duration-200 rounded-lg  hover:bg-zinc-800 "
                  >
                    <TiHeartOutline
                      className="w-6 h-6 hover:text-gray-200 "
                      color="white"
                    />
                  </a>
                </nav>
                <div className="flex flex-col mb-9 space-y-6">
                  <a className="flex justify-center " href="#">
                    <img
                      className="object-cover w-8 h-8 rounded-full"
                      src="/user-01.png"
                      alt=""
                    />
                  </a>
                </div>
              </aside>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default Sidebar;
