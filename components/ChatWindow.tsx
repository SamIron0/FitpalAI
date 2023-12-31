"use client";
import { useState, ReactNode, FC, useEffect, useRef } from "react";
import Link from "next/link";
import React from "react";
import { GetServerSidePropsContext } from "next";

import Button from "@/components/ui/Button";
import { getData, postMealPlan } from "@/utils/helpers";
import { Meal, MealPlan } from "@/types";

interface Props {
  title: string;
  footer?: ReactNode;
  children: ReactNode;
  completed: boolean;
}
interface ResponseData {
  error?: {
    statusCode: number;
    message: string;
  };
  data?: any;
}
function PlanCard({ title, footer, children, completed }: Props) {
  const bgColor = completed ? "bg-zinc-700" : "bg-zinc-700";
  return (
    <div
      className={`h-full w-48 p-px rounded-md flex-shrink-0 flex-grow-0 ${bgColor}`}
    >
      <div className="bg-black  h-full w-full  rounded-md m-auto">
        <div className="w-full h-full overflow-hidden flex flex-col rounded-md  ">
          <div className="px-2 flex-1 overflow-y-scroll h-4/5 ">
            <h1 className="text-l font-medium">{title}</h1>
            <div className="">{children}</div>
          </div>
          <div className="h-1/5 border-zinc-700 bg-zinc-900 p-2 text-zinc-500 rounded-b-md">
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
} // PlanCard

export default function ChatWindow() {
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState(1);
  const [responseData, setResponseData] = useState("");
  const [mealPlan, setMealPlan] = useState<MealPlan>();
  const [meal, setMeal] = useState<Meal>();
  const [queryText, setQueryText] = useState("");
  const [heightFtText, setHeightFtText] = useState("");

  const [messageList, setMessages] = useState<string[]>([]);
  const [mealPlanSaved, setMealPlanSaved] = useState(false);
  const planName = "";
  const planDescription = "";

  const fetchAIData = async () => {
    /*try {
            setLoading(true);
            const response = await fetch(`/api/generate?AIquery=${queryText}&userPlan=${mealPlan}`);

            const data = await response.json();
            if (data.chat != undefined) {
                setMessages((prevList) => [...prevList, "A" + data.chat]);
            }
            if (data.plan != undefined) {
                //setMeal(data);
                setMealPlan(data.plan);
            }
            setLoading(false);
        }
        catch (error) {
            console.log(error);
        }*/
    //   if (!user) {
    //       return router.push('/signin');
    //   }
    //   if (subscription) {
    //       return router.push('/account');
    //   }
    /*try {
            const { data } = await getData({
                url: '/api/create-checkout-session',
                data: { queryText }
            });
            if (data != undefined) {
                setMessages((prevList) => [...prevList, "A" + data]);
            }
         //   const stripe = await getStripe();
          //  stripe?.redirectToCheckout({ sessionId });
        } catch (error) {
            return alert((error as Error)?.message);
        } */
  };

  const handleButtonClick = () => {
    setQueryText("");
    setMessages([
      ...(messageList?.concat("U" + queryText) ?? ["U" + queryText]),
    ]);
    fetchAIData();
    //populateChat();
  };

  const ChatSection = () => {
    const messageListRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (messageListRef.current) {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
      }
    }, [messageList]);

    return (
      <div
        className="flex-1 overflow-y-scroll w-full break-words"
        ref={messageListRef}
      >
        {messageList &&
          messageList.map((message, index) => (
            <div className={`flex ${index % 2 === 0 ? "bg-zinc-900" : "bg"} `}>
              <div className="px-2 py-2 w-1/10">
                {message.charAt(0) === "U" ? (
                  <div className="circle-div overflow-hidden"></div>
                ) : (
                  <div className="circle-div overflow-hidden"></div>
                )}
              </div>
              <div className="py-3 pr-2 w-9/10">
                <p>{message.slice(1)}</p>
              </div>
            </div>
          ))}
      </div>
    );
  };

  const ProfileSection = () => {
    return (
      <div className="flex-1 overflow-y-scroll w-full px-2 py-2">
        <div className="flex">
          <div className="w-1/2">
            <p> Height</p>
          </div>

          <div className="w-1/2">
            <div className="flex">
              <div className="w-1/2">
                <input
                  type="number"
                  id="heightFtInput"
                  value={heightFtText}
                  onChange={(e) => setHeightFtText(e.target.value)}
                  className=" bg-transparent border-2 border-blue w-16 rounded-md h-8 text-gray-200  "
                />
              </div>
              <div className="w-1/2 ">
                <input
                  type="number"
                  id="heightFtInput"
                  value={heightFtText}
                  onChange={(e) => setHeightFtText(e.target.value)}
                  className=" bg-transparent border-2 border-blue w-16 rounded-md h-8 text-gray-200  "
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2">
            <p> Weight</p>
          </div>

          <div className="w-1/2">
            <p> Height</p>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2">
            <p> Sex</p>
          </div>

          <div className="w-1/2">
            <p> Height</p>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2">
            <p> Age</p>
          </div>

          <div className="w-1/2">
            <p> Height</p>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2">
            <p> Body-fat</p>
          </div>

          <div className="w-1/2">
            <p> Height</p>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2">
            <p> Activity level</p>
          </div>

          <div className="w-1/2">
            <p> Height</p>
          </div>
        </div>
      </div>
    );
  };

  const saveMealPlan = async (mealplan: MealPlan) => {
    const url = "/api/save-meal-plan";
    const body = { mealplan, planName, planDescription };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      //throw new Error(data?.error?.message ?? 'An error occurred while saving meal plan.');
    }

    //return data;
  };

  /*
    const handleCheckout = async (price: Price) => {
       // setPriceIdLoading(price.id);
        
    };
*/
  return (
    <section className="bg-black overflow-hidden flex-auto">
      <div className="sm:flex px-4 sm:flex-col sm:align-center">
        <div className="border flex border-zinc-700	max-w-3xl w-full rounded-md m-auto">
          <div className="mx-1 w-1/2">
            <h3 className="text-xl my-1 blue-gradient-text font-medium">
              Hello User
            </h3>
          </div>
          {mealPlan ? (
            <div className="mx-1 w-1/2">
              <button
                className="border float-right border-zinc-700 text-xl my-1 rounded-md font-medium"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                  saveMealPlan(mealPlan)
                    .then(() => {
                      // Execute logic after saveMealPlan Promise resolves
                    })
                    .catch((error) => {
                      // Handle error here
                    })
                }
              >
                <p className="mx-2">Save</p>
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="sm:flex px-4 sm:flex-col sm:align-center">
        <div className="border border-zinc-700	max-w-3xl w-full rounded-md m-auto my-3">
          <div className="px-1 py-1 h-56">
            <div className="flex h-full overflow-x-scroll space-x-1">
              <PlanCard
                title="Monday"
                footer={
                  <div>
                    {mealPlan ? (
                      <div className="flex items-start justify-between flex-col ">
                        {"Calories: " + mealPlan.day1.totalCalories}
                      </div>
                    ) : (
                      <div> </div>
                    )}
                  </div>
                }
                completed={true}
              >
                <div className="mt-1  w-full mb-1">
                  {loading ? (
                    <div className="h-12 mb-6">
                      
                    </div>
                  ) : mealPlan ? (
                    <div className="text-xs ">
                      <div className="row">
                        {"Breakfast: "} {mealPlan.day1.breakfast.item}
                      </div>
                      <hr />
                      <div className="row">
                        {"Lunch: "} {mealPlan.day1.lunch.item}
                      </div>
                      <hr />
                      <div className="row">
                        {"Dinner: "} {mealPlan.day1.dinner.item}
                      </div>
                      <hr />
                      <div className="row">
                        {"Snack: "} {mealPlan.day1.snack.item}
                      </div>
                    </div>
                  ) : (
                    <p></p>
                  )}
                </div>
              </PlanCard>
              <PlanCard
                title="Tuesday"
                footer={
                  <div>
                    {mealPlan ? (
                      <div className="flex items-start justify-between flex-col ">
                        {"Calories: " + mealPlan.day2.totalCalories}
                      </div>
                    ) : (
                      <div> </div>
                    )}
                  </div>
                }
                completed={true}
              >
                <div className="mt-1  w-full mb-1">
                  {loading ? (
                    <div className="h-12 mb-6">
                      
                    </div>
                  ) : mealPlan ? (
                    <div className="text-xs ">
                      <div className="row">
                        {"Breakfast: "} {mealPlan.day2.breakfast.item}
                      </div>
                      <hr />
                      <div className="row">
                        {"Lunch: "} {mealPlan.day2.lunch.item}
                      </div>
                      <hr />
                      <div className="row">
                        {"Dinner: "} {mealPlan.day2.dinner.item}
                      </div>
                      <hr />
                      <div className="row">
                        {"Snack: "} {mealPlan.day2.snack.item}
                      </div>
                    </div>
                  ) : (
                    <p></p>
                  )}
                </div>
              </PlanCard>
              <PlanCard
                title="Wednesday"
                footer={
                  <div>
                    {mealPlan ? (
                      <div className="flex items-start justify-between flex-col ">
                        {"Calories: " + mealPlan.day3.totalCalories}
                      </div>
                    ) : (
                      <div> </div>
                    )}
                  </div>
                }
                completed={true}
              >
                <div className="mt-1  w-full mb-1">
                  {loading ? (
                    <div className="h-12 mb-6">
                      
                    </div>
                  ) : mealPlan ? (
                    <div className="text-xs ">
                      <div className="row">
                        {"Breakfast: "} {mealPlan.day3.breakfast.item}
                      </div>
                      <hr />
                      <div className="row">
                        {"Lunch: "} {mealPlan.day3.lunch.item}
                      </div>
                      <hr />
                      <div className="row">
                        {"Dinner: "} {mealPlan.day3.dinner.item}
                      </div>
                      <hr />
                      <div className="row">
                        {"Snack: "} {mealPlan.day3.snack.item}
                      </div>
                    </div>
                  ) : (
                    <p></p>
                  )}
                </div>
              </PlanCard>
              <PlanCard
                title="Thursday"
                footer={
                  <div>
                    {mealPlan ? (
                      <div className="flex items-start justify-between flex-col ">
                        {"Calories: " + mealPlan.day4.totalCalories}
                      </div>
                    ) : (
                      <div> </div>
                    )}
                  </div>
                }
                completed={true}
              >
                <div className="mt-1  w-full mb-1">
                  {loading ? (
                    <div className="h-12 mb-6">
                      
                    </div>
                  ) : mealPlan ? (
                    <div className="text-xs ">
                      <div className="row">
                        {"Breakfast: "} {mealPlan.day4.breakfast.item}
                      </div>
                      <hr />
                      <div className="row">
                        {"Lunch: "} {mealPlan.day4.lunch.item}
                      </div>
                      <hr />
                      <div className="row">
                        {"Dinner: "} {mealPlan.day4.dinner.item}
                      </div>
                      <hr />
                      <div className="row">
                        {"Snack: "} {mealPlan.day4.snack.item}
                      </div>
                    </div>
                  ) : (
                    <p></p>
                  )}
                </div>
              </PlanCard>
              <PlanCard
                title="Friday"
                footer={
                  <div>
                    {mealPlan ? (
                      <div className="flex items-start justify-between flex-col ">
                        {"Calories: " + mealPlan.day5.totalCalories}
                      </div>
                    ) : (
                      <div> </div>
                    )}
                  </div>
                }
                completed={true}
              >
                <div className="mt-1  w-full mb-1">
                  {loading ? (
                    <div className="h-12 mb-6"></div>
                  ) : mealPlan ? (
                    <div className="text-xs ">
                      <div className="row">
                        {"Breakfast: "} {mealPlan.day5.breakfast.item}
                      </div>
                      <hr />
                      <div className="row">
                        {"Lunch: "} {mealPlan.day5.lunch.item}
                      </div>
                      <hr />
                      <div className="row">
                        {"Dinner: "} {mealPlan.day5.dinner.item}
                      </div>
                      <hr />
                      <div className="row">
                        {"Snack: "} {mealPlan.day5.snack.item}
                      </div>
                    </div>
                  ) : (
                    <p></p>
                  )}
                </div>
              </PlanCard>
            </div>
          </div>

          <div className="border-t h-96 overflow-hidden border-zinc-700 bg-black text-zinc-500 rounded-b-md">
            <div>
              <div className="h-80 pb-9 text-gray-200">
                <div className="flex flex-col">
                  <div className="flex border-zinc-700 border-b ">
                    <div className=" mx-auto">
                      <div
                        className={`py-2 cursor-pointer ${
                          activeSection === 1
                            ? " text-gray-200 border-b-2 border-white"
                            : "text-gray-500"
                        }`}
                        onClick={() => setActiveSection(1)}
                      >
                        <h1 className="text-xl font-bold ">CHAT</h1>
                      </div>
                    </div>
                    <div className=" mx-auto">
                      <div
                        className={`py-2 cursor-pointer ${
                          activeSection === 2
                            ? " text-gray-200 border-b-2 border-white"
                            : "text-gray-500"
                        }`}
                        onClick={() => setActiveSection(2)}
                      >
                        <h1 className="text-xl  font-bold ">PROFILE</h1>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" h-full flex flex-col">
                  {activeSection === 1 ? (
                    <ChatSection />
                  ) : activeSection === 2 ? (
                    <ProfileSection />
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <div className="relative border-zinc-700 border-t bg-black">
                <input
                  type="text"
                  id="userInput"
                  value={queryText}
                  onChange={(e) => setQueryText(e.target.value)}
                  className="pl-5 bg-transparent rounded-md h-16 text-gray-200 w-9/12 "
                  placeholder="Make a mealplan..."
                />
                <button
                  className="absolute right-0 w-3/12 top-0 h-full px-2 bg-zinc-900 text-gray-100  focus:outline-none hover:border-blue-500"
                  onClick={handleButtonClick}
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
