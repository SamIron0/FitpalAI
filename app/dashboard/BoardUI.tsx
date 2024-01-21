'use client';
import { useState } from 'react';
import Sidebar from '../../components/ui/Sidebar';
import Header from '../../components/Header';
import Container from '../../components/Container';
import GhostCard from '../../components/GhostCard';
import { TbRefresh } from 'react-icons/tb';
import ResultBox from '../../components/ResultBox';
import SuggestionPill from '../../components/SuggestionPill';
import { Meal, MealPlan } from '@/types';

function BoardUI() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [mealplan, setMealPlan] = useState<MealPlan | undefined>(undefined);
  const saveMealPlan = async () => {
    // save meal plan to supabase
    // console.log('Preparing to save meal plan');
    setIsLoading(true);
    if (mealplan) {
      console.log('Saving meal plan');

      const url = '/api/save-meal-plan';
      const body = { mealplan };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      };

      const response = await fetch(url, options);
      const data = await response.json();

      // const meal:  MealPlan = data.mealplan
      if (!response.ok) {
        throw new Error(
          data?.error?.message ?? 'An error occurred while saving meal plan.'
        );
      }
      setIsLoading(false);
    }
    //return data;
  };
  function renderGhostCards() {
    const ghostCards = [];
    for (let i = 0; i < 10; i++) {
      ghostCards.push(<GhostCard />);
    }
    return ghostCards;
  }

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://1ni3q9uo0h.execute-api.us-east-1.amazonaws.com/final',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            input: input
          })
        }
      );
      const result = await response.json();
      if (response.ok) {
        const responseBody = JSON.parse(result.body);
        setMealPlan(responseBody);
      } else {
        console.log(result);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  function emptyState() {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <div className="flex flex-col justify-center items-center h-full"></div>
      </div>
    );
  }
  function renderResultBox() {
    const results: any[] = [];
    mealplan?.meals?.forEach((meal) => {
      results.push(<ResultBox meal={meal} />);
    });

    return results;
  }
  const [input, setInput] = useState('');

  const onPillClick = (caption: string) => {
    setInput(caption);
  };
  return (
    <div className="flex w-full justify-center  bg-zinc-900 h-screen overflow-hidden  inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]">
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <div className="p-4 w-full mb-5 border-b bg-zinc-900 flex items-center pl-5 text-xl text-semibold  border-zinc-800">
          Welcome back, Dimitri
        </div>
        <div className=" p-4 w-full flex justify-center md:p-6">
          <div className="flex max-w-3xl flex-col justify-center">
            <div className="flex w-full  flex-col justify-center pb-3">
              <p className="text-4xl flex justify-center pt-12 text-semibold pb-12">
                Create a Plan
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  fetchData();
                }}
              >
                <div className="relative">
                  <input
                    value={input}
                    disabled={isLoading}
                    onChange={(e) => setInput(e.target.value)}
                    className=" px-2 w-full h-[60px] focus:outline-none bg-zinc-900 border-[1px] border-[#232325] text-md rounded-md "
                    placeholder="Ask a question"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className=" absolute end-2.5 bottom-2.5 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 inline-flex items-center justify-start pl-2 p7 overflow-hidden  text-blue-500 transition-all duration-150 ease-in-out bg-gray-50 group"
                  >
                    <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-blue-500 group-hover:h-full"></span>
                    <span className="absolute right-0 pr-2 duration-200 ease-out group-hover:translate-x-0">
                      <svg
                        className="w-4 h-4 text-black"
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

                    <span className="relative w-lg pr-3 text-left transition-colors duration-200 ease-in-out group-hover:text-white">
                      Generate
                    </span>
                  </button>
                </div>
              </form>
            </div>
            {!isLoading && !completed && (
              <div className="pb-24">
                <span className="px-2 pr-3 mb-2">Try</span>
                <SuggestionPill
                  onclick={() => {
                    onPillClick('What should I make for dinner');
                  }}
                  icon={'🍔'}
                  caption="What should I make for dinner "
                />
                <SuggestionPill
                  onclick={() => {
                    onPillClick('Make me a meal plan for the week');
                  }}
                  icon={'🍔'}
                  caption="Make me a meal plan for the week"
                />
                <SuggestionPill
                  onclick={() => {
                    onPillClick('');
                  }}
                  icon={'🍔'}
                  caption=" Make me a cheap recipe for lunch"
                />
              </div>
            )}

            <Container>
              <div className="flex w-full justify-between">
                <div className="flex ">
                  <button
                    disabled={isLoading}
                    className="inline-flex mx-1 items-center justify-center w-10 h-10 mr-2 text-zinc-900 transition-colors duration-150 bg-gray-200 rounded-lg focus:shadow-outline hover:bg-gray-400"
                  >
                    <TbRefresh className="w-4 h-14" />
                  </button>
                  <button
                    disabled={isLoading}
                    onClick={() => saveMealPlan()}
                    className="inline-flex mx-1 items-center justify-center w-10 h-10 mr-2 text-indigo-100 transition-colors duration-150 bg-blue-500 rounded-lg focus:shadow-outline hover:bg-blue-700"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="pt-4 ">
                {isLoading
                  ? renderGhostCards()
                  : mealplan?.meals && mealplan?.meals?.length > 0
                  ? renderResultBox()
                  : emptyState()}
              </div>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoardUI;
