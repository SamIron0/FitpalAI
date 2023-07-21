'use client';

import { getData } from "@/utils/helpers";
import Link from "next/link";
import { useEffect, useState } from "react";
//import Image from "next/image";


function waitlist() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [savedNotificationVisible, setSavedNotificationVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const showMessage = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  }


  const saveWaitListContact = async (userName: string, userEmail: string) => {
    try {
      const { data } = await getData({
        url: '/api/create-checkout-session',
        data: { userName, userEmail }
      });
      showMessage();

    } catch (error) {
      return alert((error as Error)?.message);
    }
  }

  return (
    <div className='h-full bg-black'>
        {showAlert && (
          <div
            className="pt-4 mx-auto sm:pt-8 w-[300px] rounded-md text-gray-700 px-4 py-3 shadow-md relative flex bg-white border-blue-500 text-blue-500"
            role="alert"
          >
            <span className="block sm:inline">Joined Waitlist</span>
          </div>
        )}
      <div className="mx-auto py-8 w-full sm:pt-24 pb-6 px-4 sm:px-6 lg:px-8">
        <h2 className="flex pt-20 text-4xl pb-6 justify-center">Join the Waitlist</h2>

        <form className="flex flex-col w-6/10  items-center">

          <input value={userName} onChange={(e) => setUserName(e.target.value)} className="my-4 px-2 bg-transparent border-[1px] border-gray-200  text-lg h-[50px] w-[310px] rounded-md md:w-[500px] " placeholder="Name" />
          <input value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="mb-8 px-2 bg-transparent border-[1px] border-gray-200  h-[50px] text-lg  w-[310px] rounded-md md:w-[500px]" placeholder="Email" />
          <div className="h-[1px] bg-gray-600 w-[310px] sm:w-[500px] "></div>
          <button
            type="button"
            onClick={(e) => saveWaitListContact(userName, userEmail).then(() => {
              setUserEmail("");
              setUserName("");
            }).catch(error => {
              // Handle error here
            })}

            className="group mt-8 w-[310px] h-[50px] md:w-[500px] rounded-md px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#f5f7f9] text-[#1E2B3A] no-underline active:scale-95 scale-100 duration-75"
            style={{
              boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
            }}
          >
            <span className="text-lg"> Join </span>
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.75 6.75L19.25 12L13.75 17.25"
                stroke="#1E2B3A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 12H4.75"
                stroke="#1E2B3A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <Link
            href="/"
            className="group mt-4 w-[310px] border-blue-500 border-[1px] h-[50px] md:w-[500px] rounded-md px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-zinc-900  text-[#1E2B3A] no-underline active:scale-95 scale-100 duration-75"
            style={{
              boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
            }}
          >
            <span className="text-lg text-gray-200"> Back to Home </span>

          </Link>
        </form>
      </div>


    </div >

  );
}
export default waitlist;