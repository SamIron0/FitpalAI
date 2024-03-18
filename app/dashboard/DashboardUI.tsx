'use client';
import { FaRegHeart } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';
import { BsThreeDotsVertical } from 'react-icons/bs';
import * as React from 'react';
import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { Doughnut } from 'react-chartjs-2';

import { useEffect, useState } from 'react';
import { TbRefresh } from 'react-icons/tb';
import SuggestionPill from '../../components/SuggestionPill';
import { MealPlan, UserDetails } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Allergies } from '@/components/Allergies';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import axios from 'axios';
import { getData, postData } from '@/utils/helpers';
import { Pantry } from '@/components/Pantry';
import { Calories } from '@/components/Calories';
import toast from 'react-hot-toast';
import { User } from '@supabase/supabase-js';
import { DatePicker } from '@/components/DatePicker';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { useSidebar } from '../providers/SideBarContext';
import { EmptyMealplans } from '@/components/EmptyMealplans';
import { useUserDetails } from '../providers/UserDetailsContext';
import { LuDivideSquare } from 'react-icons/lu';

import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  Drawer
} from '@/components/ui/drawer';
import { Calendar } from '@/components/ui/calendar';
import { useRouter } from 'next/navigation';
import { EmptyCalories } from '@/components/EmptyCalories';
import Announcement from '@/components/Announcement';
import { getUserDetails } from '../supabase-server';

export const addAllergies = (allergies: string[]) => {
  if (allergies.length > 0) {
    postData({ url: '/api/update-allergies', data: allergies });
  }
};

interface DashboardUIProps {
  user: User | undefined;
}
export function DashboardUI({ user }: DashboardUIProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [createdMealplan, setCreatedMealPlan] = useState<MealPlan | undefined>(
    undefined
  );
  const [user_location, setUserLocation] = useState({});
  const [usersMealPlans, setUsersMealPlans] = useState<MealPlan[]>([]);
  const { userDetails, setUserDetails } = useUserDetails();
  const [trackDate, setTrackDate] = React.useState<Date>(new Date());
  const [planDate, setPlanDate] = React.useState<Date>();
  const [drawerMode, setDrawerMode] = useState('Calendar');
  useEffect(() => {
    const retrieveMealPlan = async () => {
      try {
        const data = await postData({
          url: '/api/retrieve-meal-plans',
          data: { trackDate: trackDate }
        });
        if (!data) {
          return;
        }
        setUsersMealPlans(data);
        setActiveMealPlan(data[0]);
        if (data.length > 0) {
          setGenerateMode(false);
        }
        return data;
      } catch (error) {
        console.log(error);
      }
    };
    retrieveMealPlan();
  }, [trackDate]);

  useEffect(() => {
    const getDetails = async () => {
      const data = await getData({
        url: '/api/get-user-details'
      });
      setUserDetails(data);
      if (!data?.macros) setAnnouncementOpen(true);
    };
    getDetails();
  }, []);

  useEffect(() => {
    setActiveMealPlan(createdMealplan);
  }, [createdMealplan]);
  const saveMealPlan = async () => {
    // save meal plan to supabase

    setIsLoading(true);

    if (createdMealplan === undefined) {
      setIsLoading(false);
      toast.error('Create meal plan first');
      return;
    }

    const new_plan: MealPlan = {
      meals: createdMealplan.meals,
      id: createdMealplan.id,
      owner: createdMealplan.owner,
      date: planDate,
      macros: createdMealplan.macros
    };

    const toastId = toast.loading('Saving meal plan');

    try {
      const data = await postData({
        url: '/api/save-meal-plan',
        data: { mealplan: new_plan }
      });
      if (!data) {
        toast.dismiss(toastId);
        toast.error('Error saving meal plan');
        return;
      }
      setIsLoading(false);
      toast.dismiss(toastId);
      toast.success('Meal plan saved successfully');
      setGenerateMode(false);
    } catch (error) {
      setIsLoading(false);
      toast.dismiss(toastId);
      toast.error('Error saving meal plan');
    }
  };
  function renderGhostCards() {
    const ghostCards = [];
    for (let i = 0; i < 3; i++) {
      ghostCards.push(<Skeleton className="w-full mx-auto mb-4 h-20" />);
    }
    return ghostCards;
  }

  const onsetCalorieClick = () => {
    router.push('/preferences');
  };
  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const data = await fetch('/api/getLocation');
        if (!data) {
          console.log('Error fetching location');
          return;
        }
        console.log(data);
        setUserLocation(data);
      } catch (error) {
        console.log(error);
      }

      getUserLocation();
    };
  });
  const fetchData = async (query: string) => {
    setIsLoading(true);
    const user_profile = {
      allergies: userDetails?.allergies || [],
      macros: userDetails?.macros,
      diet_type: userDetails?.diet_type,
      user_location: user_location,
      user_name: user?.email
    };

    input != '' ? setQueryResultPageHeader(input) : null;
    var ngrokLink =
      'https://ea6d-2604-3d09-aa7a-95e0-9df7-c484-1877-40db.ngrok-free.app/execute-script';

    try {
      var result = await axios.post(ngrokLink, {
        user: user_profile,
        special_instructions: query
      });

      var data = result.data.body;

      const mealplan: MealPlan = {
        id: '',
        owner: '',
        date: planDate,
        meals: [
          {
            type: 'breakfast',
            foods: data.breakfast,
            macros: {
              protein: data.breakfast_protein,
              fat: data.breakfast_fat,
              carbs: data.breakfast_carbs,
              total_calories: data.breakfast_calories
            }
          },
          {
            type: 'lunch',
            foods: data.lunch,
            macros: {
              protein: data.lunch_protein,
              fat: data.lunch_fat,
              carbs: data.lunch_carbs,
              total_calories: data.lunch_calories
            }
          },
          {
            type: 'dinner',
            foods: data.dinner,
            macros: {
              protein: data.dinner_protein,
              fat: data.dinner_fat,
              carbs: data.dinner_carbs,
              total_calories: data.dinner_calories
            }
          }
        ],
        macros: {
          protein: data.total_protein,
          fat: data.total_fat,
          carbs: data.total_carbs,
          total_calories: data.total_calories
        }
      };
      setCreatedMealPlan(mealplan);
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
  const likeMeal = async (meal: any) => {
    setIsLoading(true);
    try {
      const data = await postData({
        url: '/api/like-meal',
        data: meal
      });
      const result = JSON.parse(data.body);
      let parsedData = JSON.parse(result);
      if (!parsedData) {
        toast.error('Coming soon');
        return;
      }
      toast.success('Added to likes');
    } catch (error) {
      toast.error('Error liking meal');
      setIsLoading(true);
    }
  };
  function renderResultBox() {
    const results: any[] = [];
    createdMealplan?.meals?.forEach((meal) => {
      {
        results.push(
          <Card className="mb-4 mx-auto p-4 w-full">
            <div className="flex flex-row w-full items-center justify-center">
              <CardTitle className="text-muted-foreground">
                {meal.type}
              </CardTitle>
              <div className="flex w-full justify-end ">
                <div className="flex justify-end">
                  <button
                    disabled={isLoading}
                    onClick={() => likeMeal(meal)}
                    className="inline-flex mx-1 items-center justify-center w-9 h-9 mr-2 text-indigo-100 transition-colors duration-150 bg-blue-500 rounded-lg focus:shadow-outline hover:bg-blue-700"
                  >
                    <FaRegHeart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div>
              {meal &&
                meal.foods?.map((food: any, index: number, array: any[]) =>
                  index === array.length - 1 ? food : food + ', '
                )}
            </div>
            <div>{meal.macros?.total_calories} Calories</div>
          </Card>
        );
      }
    });
    return results;
  }
  const [input, setInput] = useState('');
  const [queryResultPageHeader, setQueryResultPageHeader] = useState('');
  const [gptResponse, setGptResponse] = useState();
  const onPillClick = (caption: string) => {
    setInput(caption);
  };
  const [activeMealPlan, setActiveMealPlan] = useState<MealPlan>();
  const [generateMode, setGenerateMode] = useState(true);
  const { isSidebarOpen } = useSidebar();
  const [announcementOpen, setAnnouncementOpen] = useState(false);
  return (
    <>
      {isSidebarOpen && (
        <div
          style={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)'
          }}
        />
      )}
      <>
        <div className="w-full pb-12 flex flex-col">
          <div className="w-full flex justify-end pr-4 pt-4 ">
            {generateMode ? (
              <Button onClick={() => setGenerateMode(false)} className="px-4">
                Track
              </Button>
            ) : (
              <Button
                onClick={() => setGenerateMode(true)}
                className="bg-blue-600  hover:bg-blue-500 "
              >
                <BsStars className="pr-1" />
                Generate
              </Button>
            )}
          </div>
          <div className="w-full sm:p-12 p-4 max-w-3xl mx-auto">
            <div className="w-full pt-8 flex flex-col justify-center">
              {generateMode ? (
                <div className="w-full mb-4">
                  <div className="relative flex flex-1 flex-col">
                    <div className=" w-full mx-auto flex flex-col justify-center">
                      {!createdMealplan?.meals && !isLoading && (
                        <div className="flex w-full  flex-col justify-center pb-3">
                          <p className="text-4xl flex justify-center py-10 text-semibold ">
                            Create a Mealplan
                          </p>

                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              fetchData(input);
                            }}
                          >
                            <Button
                              type="submit"
                              onClick={() => setGenerateMode(true)}
                              className="bg-blue-600  hover:bg-blue-500 flex  mx-auto w-full "
                            >
                              Generate
                            </Button>
                            <span className="py-4 w-full flex justify-center items-center text-sm text-zinc-400">
                              or
                            </span>
                            <div className="relative flex items-center justify-center w-full">
                              <input
                                value={input}
                                disabled={isLoading}
                                onChange={(e) => setInput(e.target.value)}
                                className=" px-2 pl-4 w-full h-[60px] focus:outline-none bg-zinc-800 border-[1px] border-zinc-600 text-md rounded-md "
                                placeholder="Enter special instructions(optional)"
                              />
                              <button
                                type="submit"
                                disabled={isLoading || !input}
                                className={`inline-flex absolute  p-2 end-2.5 mx-1 items-center justify-center w-8 h-8 mr-2 text-indigo-100 transition-colors duration-150 bg-blue-500 rounded-full focus:shadow-outline hover:bg-blue-700 ${
                                  input
                                    ? 'cursor-pointer '
                                    : 'cursor-not-allowed'
                                } `}
                              >
                                <FaArrowRight className={`w-4 h-4  `} />{' '}
                              </button>
                            </div>
                          </form>
                        </div>
                      )}
                      {!isLoading && !completed && !createdMealplan?.meals && (
                        <div className="pb-24">
                          <span className="px-2 pr-3 mb-2">Try</span>
                          <SuggestionPill
                            onclick={() => {
                              onPillClick('Include cajun shrimp');
                            }}
                            icon={'🦐'}
                            caption="Include cajun shrimp"
                          />
                          <SuggestionPill
                            onclick={() => {
                              onPillClick('Include alfredo pasta');
                            }}
                            icon={'🍜'}
                            caption="Include alfredo pasta"
                          />
                          <SuggestionPill
                            onclick={() => {
                              onPillClick(
                                'Air fryer recipe for lunch and dinner'
                              );
                            }}
                            icon={'🥓'}
                            caption="Air fryer recipe for lunch and dinner"
                          />
                        </div>
                      )}
                      {isLoading ? (
                        <div className="">
                          <Skeleton className="max-w-lg mb-7 h-7" />
                          <Skeleton className="max-w-md mb-4 h-7" />
                          {renderGhostCards()}
                        </div>
                      ) : createdMealplan?.meals ? (
                        <>
                          <p className="text-3xl pb-7">
                            {queryResultPageHeader}
                          </p>
                          <div className="w-full pb-4 flex flex-row">
                            <div className="flex flex-col w-full">
                              <span className="flex items-center text-md">
                                {createdMealplan?.macros?.total_calories}{' '}
                                Calories
                              </span>
                              <span className="flex text-muted-foreground text-sm">
                                {createdMealplan?.macros?.protein}g Protein,{' '}
                                {createdMealplan?.macros?.fat}g Fat,{' '}
                                {createdMealplan?.macros?.carbs}g Carbs{' '}
                              </span>
                            </div>
                            <span className="flex items-center flex-row justify-end">
                              <Button
                                disabled={isLoading}
                                onClick={() => {
                                  fetchData(queryResultPageHeader).then(() =>
                                    setInput('')
                                  );
                                }}
                                className="inline-flex mx-1 px-3 items-center justify-center mr-1 text-zinc-900 transition-colors duration-150 bg-gray-200 rounded-md focus:shadow-outline hover:bg-gray-400"
                              >
                                <TbRefresh className="w-4 h-4" />
                              </Button>
                              <Drawer>
                                <DrawerTrigger asChild>
                                  <Button variant="outline">Save</Button>
                                </DrawerTrigger>
                                <div className="flex  w-full items-center justify-center">
                                  <DrawerContent className="flex border-muted flex-col px-4 justify-center">
                                    {drawerMode === 'Calendar' ? (
                                      <div className="flex flex-col">
                                        <Calendar
                                          mode="single"
                                          selected={planDate}
                                          onSelect={setPlanDate}
                                          initialFocus
                                          className="border-muted flex justify-center  mb-6 text-white"
                                        />
                                        <Button
                                          className="max-w-md mx-auto w-full  mb-2"
                                          onClick={() => saveMealPlan()}
                                        >
                                          Save
                                        </Button>
                                      </div>
                                    ) : (
                                      drawerMode === 'Confirmation' && (
                                        <p>
                                          A meal plan already exists for this
                                          day. Are you sure you want to
                                          continue?
                                        </p>
                                      )
                                    )}
                                    <DrawerClose className="w-full flex justify-center items-center">
                                      <Button
                                        variant={'outline'}
                                        className="max-w-md w-full text-zinc-300 mb-2 "
                                      >
                                        Cancel
                                      </Button>
                                    </DrawerClose>
                                  </DrawerContent>
                                </div>
                              </Drawer>
                            </span>
                          </div>
                          {renderResultBox()}
                        </>
                      ) : (
                        emptyState()
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full mb-4">
                  <div className="w-full flex flex-col">
                    {' '}
                    <div className="w-full flex items-center justify-between flex-row pb-4">
                      <h2 className="text-md text-muted-foreground">
                        Meal Plan
                      </h2>
                      <DatePicker
                        trackDate={trackDate}
                        setPlanDate={setTrackDate}
                      />
                    </div>
                    {usersMealPlans?.length === 0 ? (
                      <EmptyMealplans
                        onGenerateClick={() => setGenerateMode(true)}
                      />
                    ) : (
                      <div>
                        {activeMealPlan?.meals.map((meal) => {
                          return (
                            meal && (
                              <Card className="mb-4 w-full">
                                <div className="w-full flex justify-between flex-row">
                                  <div className="flex p-4 flex-col ">
                                    <div className="flex pb-2 flex-row w-full items-center  text-muted-foreground">
                                      {meal.type}
                                    </div>
                                    <div>{meal.foods}</div>
                                    <div className="flex pt-2 flex-col w-full">
                                      {meal.macros && (
                                        <span className="flex items-center text-md">
                                          {meal?.macros?.carbs +
                                            meal?.macros?.protein +
                                            meal?.macros?.fat}{' '}
                                          Calories
                                        </span>
                                      )}
                                      <span className="flex text-muted-foreground text-sm">
                                        {meal.macros?.carbs} Carbs{' '}
                                        {meal.macros?.protein} Protein{' '}
                                        {meal.macros?.fat} Fat
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex px-3 items-center justify-end">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          className="h-8 w-8 p-0"
                                        >
                                          <span className="sr-only">
                                            Open menu
                                          </span>
                                          <DotsHorizontalIcon className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent
                                        className="border-muted"
                                        align="end"
                                      >
                                        <DropdownMenuItem>
                                          Regenerate
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </div>
                              </Card>
                            )
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <Card className="w-full flex justify-center ">
                {userDetails?.macros ? (
                  <div className="w-full flex justify-center py-4">
                    <Calories
                      macros={{
                        protein: createdMealplan?.macros.protein || 0,
                        fat: createdMealplan?.macros.fat || 0,
                        carbs: createdMealplan?.macros.carbs || 0,
                        total_calories:
                          createdMealplan?.macros.total_calories || 0
                      }}
                    />
                  </div>
                ) : (
                  <EmptyCalories onSetCalories={() => onsetCalorieClick()} />
                )}
              </Card>
            </div>
          </div>
        </div>
        {createdMealplan?.meals && generateMode && (
          <>
            <div className="fixed bottom-5 px-4 w-full flex justify-center items-center">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  fetchData(input).then(() => setInput(''));
                }}
                className="w-full flex justify-center"
              >
                <div className="relative flex w-full  items-center max-w-md sm:max-w-xl">
                  <input
                    value={input}
                    disabled={isLoading}
                    onChange={(e) => setInput(e.target.value)}
                    className=" px-2 pl-4 w-full h-[60px] focus:outline-none bg-zinc-800 border-[1px] border-zinc-600 text-md rounded-full "
                    placeholder="Ask about a meal"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input}
                    className={`inline-flex absolute end-2.5 mx-1 items-center justify-center w-8 h-8 mr-2 text-indigo-100 transition-colors duration-150 bg-blue-500 rounded-full focus:shadow-outline hover:bg-blue-700 ${
                      input ? 'cursor-pointer ' : 'cursor-not-allowed'
                    } `}
                  >
                    <FaArrowRight className={`w-4 h-4   } `} />
                  </button>
                </div>
              </form>
            </div>{' '}
          </>
        )}
      </>
    </>
  );
}
