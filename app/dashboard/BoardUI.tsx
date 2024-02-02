'use client';
import { useState } from 'react';
import Sidebar from '../../components/ui/Sidebar';
import Header from '../../components/Header';
import Container from '../../components/Container';
import GhostCard from '../../components/GhostCard';
import { TbRefresh } from 'react-icons/tb';
import ResultBox from '../../components/ResultBox';
import SuggestionPill from '../../components/SuggestionPill';
import { MealType, MealPlan, UserDetails } from '@/types';
import { postData } from '@/utils/helpers';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle
} from '@/components/ui/card';
import { CardStackIcon } from '@radix-ui/react-icons';
import { Skeleton } from '@/components/ui/skeleton';

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
    for (let i = 0; i < 4; i++) {
      ghostCards.push(<Skeleton className="w-[360px] mx-auto gap-4 h-32" />);
    }
    return ghostCards;
  }
  const fetchData = async (query: string) => {
    setIsLoading(true);
    let mealplan: MealPlan; //await getData(query);
    const userDetails: UserDetails = {
      allergies: [],
      goals: [],
      weight: 0,
      age: 0,
      macros: {
        protein: 0,
        fat: 0,
        carbs: 0
      }
    };
    try {
      const result = await postData({
        url: 'https://3x077l0rol.execute-api.us-east-1.amazonaws.com/main/',
        data: {
          query: query,
          userDetails: userDetails
        }
      });
      const data = JSON.parse(result.body);
      let parsedData = JSON.parse(data);
      //setGptResponse(result);
      console.log('Parsed data: ', parsedData);
      console.log(parsedData.breakfast);
      mealplan = {
        id: '',
        owner: '',
        meals: [
          { type: 'breakfast', title: parsedData.breakfast },
          {
            type: 'lunch',
            title: parsedData.lunch
          },
          {
            type: 'dinner',
            title: parsedData.dinner
          },
          {
            type: 'snack',
            title: parsedData.snack
          }
        ]
      };
      setMealPlan(mealplan);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
      results.push(
        <Card className="mb-4 ">
          <CardHeader className="flex flex-row w-full justify-between">
            <CardTitle>{meal.type}</CardTitle>
            <div className="flex w-full justify-between">
              <div className="flex ">
                <button
                  disabled={isLoading}
                  className="inline-flex mx-1 items-center justify-center w-6 h-6 mr-2 text-zinc-900 transition-colors duration-150 bg-gray-200 rounded-lg focus:shadow-outline hover:bg-gray-400"
                >
                  <TbRefresh className="w-3 h-10" />
                </button>
                <button
                  disabled={isLoading}
                  onClick={() => saveMealPlan()}
                  className="inline-flex mx-1 items-center justify-center w-6 h-6 mr-2 text-indigo-100 transition-colors duration-150 bg-blue-500 rounded-lg focus:shadow-outline hover:bg-blue-700"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>{meal.title}</CardContent>
        </Card>
      );
    });
    return results;
  }
  const [input, setInput] = useState('');
  const [gptResponse, setGptResponse] = useState();
  const onPillClick = (caption: string) => {
    setInput(caption);
  };
  const logClick = async () => {
    const name = 'Generate';
    const url = '/api/log-click';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(name)
    };

    const response = await fetch(url, options);
    const data = await response.json();

    // const meal:  MealPlan = data.mealplan
    if (!response.ok) {
    }
  };
  return (
    <div className="flex w-full justify-center  bg-zinc-900 h-screen overflow-hidden  inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]">
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <div className="pl-16 py-3 w-full mb-5 border-b bg-zinc-900 flex items-center text-xl text-semibold  border-zinc-800">
          Welcome back
        </div>
        <div className=" p-4 w-full flex flex-col justify-center md:p-6">
          <div className="flex w-full  flex-col justify-center pb-3">
            <p className="text-4xl flex justify-center pt-12 text-semibold pb-12">
              Create a Plan
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetchData(input);
              }}
            >
              <div className="relative w-full">
                <input
                  value={input}
                  disabled={isLoading}
                  onChange={(e) => setInput(e.target.value)}
                  className=" px-2 pl-4 w-full h-[60px] focus:outline-none bg-zinc-800 border-[1px] border-zinc-600 text-md rounded-md "
                  placeholder="Ask about a meal"
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
                icon={'🥘'}
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
                  onPillClick('Make me a cheap recipe for lunch');
                }}
                icon={'🍜'}
                caption=" Make me a cheap recipe for lunch"
              />
            </div>
          )}

          <Card className="w-full p-4  sm:p-8 ">
            {isLoading
              ? renderGhostCards()
              : mealplan?.meals
              ? renderResultBox()
              : emptyState()}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default BoardUI;
