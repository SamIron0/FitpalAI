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

const data: Payment[] = [
  {
    id: 'm5gr84i9',
    amount: 316,
    status: 'success',
    email: 'ken99@yahoo.com'
  },
  {
    id: '3u1reuv4',
    amount: 242,
    status: 'success',
    email: 'Abe45@gmail.com'
  },
  {
    id: 'derv1ws0',
    amount: 837,
    status: 'processing',
    email: 'Monserrat44@gmail.com'
  },
  {
    id: '5kma53ae',
    amount: 874,
    status: 'success',
    email: 'Silas22@gmail.com'
  },
  {
    id: 'bhqecj4p',
    amount: 721,
    status: 'failed',
    email: 'carmella@hotmail.com'
  }
];

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('status')}</div>
    )
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Refresh
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
export const addAllergies = (allergies: string[]) => {
  if (allergies.length > 0) {
    postData({ url: '/api/update-allergies', data: allergies });
  }
};

interface DashboardUIProps {
  user: User | undefined;
}
export function DashboardUI({ user }: DashboardUIProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [createdMealplan, setCreatedMealPlan] = useState<MealPlan | undefined>(
    undefined
  );
  const [usersMealPlans, setUsersMealPlans] = useState<MealPlan[]>([]);
  const { userDetails, setUserDetails } = useUserDetails();

  useEffect(() => {
    const retrieveMealPlan = async () => {
      try {
        const data = await getData({
          url: '/api/retrieve-meal-plans'
        });
        if (!data) {
          return;
        }
        console.log(data);
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
  }, []);

  useEffect(() => {
    console.log('updating');
    const getDetails = async () => {
      const data = await getData({
        url: '/api/get-user-details'
      });
      setUserDetails(data);
    };
    getDetails();
  }, []);

  useEffect(() => {
    setActiveMealPlan(createdMealplan);
  }, [createdMealplan]);
  const saveMealPlan = async () => {
    // save meal plan to supabase
    // console.log('Preparing to save meal plan');
    setIsLoading(true);
    if (createdMealplan === undefined) {
      setIsLoading(false);
      toast.error('Create meal plan first');
      return;
    }
    const toastId = toast.loading('Saving meal plan');
    try {
      const data = await postData({
        url: '/api/save-meal-plan',
        data: { mealplan: createdMealplan }
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

  //call aws to create the initial meal plan
  const fetchData = async (query: string) => {
    setIsLoading(true);
    let mealplan: MealPlan; //await getData(query);
    const user: UserDetails = {
      allergies: userDetails?.allergies || [],
      goals: userDetails?.goals || [],
      weight: userDetails?.weight,
      age: userDetails?.age,
      macros: userDetails?.macros
    };
    try {
      const result = await postData({
        url: 'https://3x077l0rol.execute-api.us-east-1.amazonaws.com/main/',
        data: {
          query: query,
          userDetails: user
        }
      });
      const data = JSON.parse(result.body);
      let parsedData = JSON.parse(data);
      //setGptResponse(result);
      //sconst user_protein = parsedData.calories;
      //console.log('parsedData', JSON.parse(data).inputMacros);

      mealplan = {
        id: '',
        owner: '',
        meals: [
          {
            type: 'breakfast',
            title: parsedData.breakfast.title,
            macros: parsedData.breakfast.macros
          },
          {
            type: 'lunch',
            title: parsedData.lunch.title,
            macros: parsedData.lunch.macros
          },
          {
            type: 'dinner',
            title: parsedData.dinner.title,
            macros: parsedData.dinner.macros
          },
          {
            type: 'snack',
            title: parsedData.snacks.title,
            macros: parsedData.snacks.macros
          }
        ]
      };
      setQueryResultPageHeader(input);
      setInput('');
      setCreatedMealPlan(mealplan);

      // set total calories
      setCalories(
        mealplan.meals.reduce((accum: number, meal: any) => {
          return (
            accum +
            (meal.macros?.carbs * 4 +
              meal.macros?.fat * 9 +
              meal.macros?.protein * 4)
          );
        }, 0)
      );
      setProtein(
        mealplan.meals.reduce((accum: number, meal: any) => {
          return accum + meal.macros?.protein;
        }, 0)
      );

      setCarbs(
        mealplan.meals.reduce((accum: number, meal: any) => {
          return accum + meal.macros?.carbs;
        }, 0)
      );

      setFats(
        mealplan.meals.reduce((accum: number, meal: any) => {
          return accum + meal.macros?.fat;
        }, 0)
      );
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
        toast.error('Error liking meal');
        return;
      }
      toast.success('Added to likes');
    } catch (error) {
      toast.error('Error liking meal');
    }
  };
  function renderResultBox() {
    const results: any[] = [];
    createdMealplan?.meals?.forEach((meal) => {
      {
        meal.title &&
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
                      className="inline-flex mx-1 items-center justify-center w-9 h-9 mr-0.5 text-zinc-900 transition-colors duration-150 bg-gray-200 rounded-lg focus:shadow-outline hover:bg-gray-400"
                    >
                      <TbRefresh className="w-4 h-4" />
                    </button>
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
              <div>{meal.title}</div>
              <div>
                {meal.macros?.carbs &&
                  meal.macros?.fat &&
                  meal.macros?.protein &&
                  meal.macros.carbs * 4 +
                    meal.macros.fat * 9 +
                    meal.macros.protein * 4}{' '}
                Calories
              </div>
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

  const [saveDate, setSaveDate] = React.useState<Date>();
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFats] = useState(0);
  const [calories, setCalories] = useState(0);
  const [activeMealPlan, setActiveMealPlan] = useState<MealPlan>();
  const [generateMode, setGenerateMode] = useState(true);
  const { isSidebarOpen } = useSidebar();

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
                          Create a Plan
                        </p>

                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            fetchData(input);
                          }}
                        >
                          <div className="relative flex items-center justify-center w-full">
                            <input
                              value={input}
                              disabled={isLoading}
                              onChange={(e) => setInput(e.target.value)}
                              className=" px-2 pl-4 w-full h-[60px] focus:outline-none bg-zinc-800 border-[1px] border-zinc-600 text-md rounded-md "
                              placeholder="Ask about a meal"
                            />
                            <button
                              type="submit"
                              disabled={isLoading || !input}
                              className={`inline-flex absolute  p-2 end-2.5 mx-1 items-center justify-center w-8 h-8 mr-2 text-indigo-100 transition-colors duration-150 bg-blue-500 rounded-full focus:shadow-outline hover:bg-blue-700 ${
                                input ? 'cursor-pointer ' : 'cursor-not-allowed'
                              } `}
                            >
                              <FaArrowRight className={`w-4 h-4  `} />{' '}
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                    {!isLoading && !completed && !createdMealplan?.meals ? (
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
                    ) : (
                      isLoading && !completed && <div className="h-14" />
                    )}

                    {isLoading ? (
                      <div className="pt-12">
                        <Skeleton className="max-w-lg mx-auto mb-8 h-6" />
                        {renderGhostCards()}
                      </div>
                    ) : createdMealplan?.meals ? (
                      <>
                        <p className="text-3xl pb-7">{queryResultPageHeader}</p>
                        <div className="w-full pb-4 flex flex-row">
                          <div className="flex flex-col w-full">
                            <span className="flex items-center text-md">
                              {calories} Calories
                            </span>
                            <span className="flex text-muted-foreground text-sm">
                              {protein}g Protein, {fat}g Fat, {carbs}g Carbs{' '}
                            </span>
                          </div>
                          <span className="flex items-center justify-end">
                            <Drawer>
                              <DrawerTrigger asChild>
                                <Button variant="outline">Save</Button>
                              </DrawerTrigger>
                              <div className="flex  w-full items-center justify-center">
                                <DrawerContent className="flex border-muted flex-col justify-center">
                                  <Calendar
                                    mode="single"
                                    selected={saveDate}
                                    onSelect={setSaveDate}
                                    initialFocus
                                    className="border-muted  mb-6"
                                  />{' '}
                                  <Button className="max-w-lg w-full  mb-2">
                                    Save
                                  </Button>
                                  <DrawerClose>
                                    <Button variant={'outline'} className="max-w-lg w-full  mb-2">
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
                {!activeMealPlan?.meals ? (
                  <EmptyMealplans
                    onGenerateClick={() => setGenerateMode(true)}
                  />
                ) : (
                  <div className="w-full flex flex-col">
                    {' '}
                    <div className="w-full flex items-center justify-between flex-row pb-4">
                      <h2 className="text-md text-muted-foreground">
                        Meal Plan
                      </h2>
                      <DatePicker />
                    </div>
                    <div>
                      {activeMealPlan?.meals.map((meal) => {
                        return (
                          meal.title && (
                            <Card className="mb-4 w-full">
                              <div className="w-full flex justify-between flex-row">
                                <div className="flex p-4 flex-col ">
                                  <div className="flex pb-2 flex-row w-full items-center  text-muted-foreground">
                                    {meal.type}
                                  </div>
                                  <div>{meal.title}</div>
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
                  </div>
                )}
              </div>
            )}

            <Card className="w-full flex justify-center py-4 ">
              {!activeMealPlan?.meals ? (
                <Calories macros={{ protein, fat, carbs, calories }} />
              ) : (
                <Calories macros={{ protein, fat, carbs, calories }} />
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
                fetchData(input);
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
  );
}
