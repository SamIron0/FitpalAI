'use client';

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

import { useState } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { postData } from '@/utils/helpers';
import { Pantry } from '@/components/Pantry';
import Calories  from '@/components/Calories';

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
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
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
export function DashboardUI() {
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
      ghostCards.push(<Skeleton className="w-[360px] mx-auto mb-4 h-32" />);
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
        <Card className="mb-4 mx-auto max-w-[420px]">
          <CardHeader className="flex flex-row w-full items-center justify-center">
            <CardTitle className="text-muted-foreground">{meal.type}</CardTitle>
            <div className="flex w-full justify-between">
              <div className="flex justify-end">
                <button
                  disabled={isLoading}
                  className="inline-flex mx-1 items-center justify-center w-6 h-6 mr-0.5 text-zinc-900 transition-colors duration-150 bg-gray-200 rounded-lg focus:shadow-outline hover:bg-gray-400"
                >
                  <TbRefresh className="w-4 h-10" />
                </button>
                <button
                  disabled={isLoading}
                  onClick={() => saveMealPlan()}
                  className="inline-flex mx-1 items-center justify-center w-6 h-6 mr-2 text-indigo-100 transition-colors duration-150 bg-blue-500 rounded-lg focus:shadow-outline hover:bg-blue-700"
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

  const [protein, setProtein] = useState(220);
  const [carbs, setCarbs] = useState(220);
  const [fat, setFat] = useState(220);
  return (
    <div className="w-full sm:p-12 p-4">
      <div className="w-full pt-4 flex flex-col justify-center md:flex-row">
        <Card className="w-full sm:w-3/5 mb-4 sm:mb-0 sm:mr-4">
          <div className="relative flex flex-1 flex-col">
            <div className=" p-4 max-w-2xl mx-auto flex flex-col justify-center md:p-6">
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
              {!isLoading && !completed ? (
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

              <Card className="w-full p-4  sm:p-8 ">
                {isLoading ? (
                  renderGhostCards()
                ) : mealplan?.meals ? (
                  <>
                    <CardHeader>
                      <CardTitle className="text-2xl flex flex-row w-full">
                        <p>Meal Plan</p>
                        <span className="flex justify-end">
                          <Button>Save</Button>
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent> {renderResultBox()} </CardContent>
                  </>
                ) : (
                  emptyState()
                )}
              </Card>
            </div>
          </div>
        </Card>
        <Card className="w-full sm:w-2/5 mb-4 sm:mb-0 sm:mr-4">
          <Calories />
        </Card>
      </div>
      <div className="w-full pt-4 flex flex-col justify-center md:flex-row">
        <Card className="w-full md:w-1/2 mb-4 md:mb-0 md:mr-4">
          <Pantry />
        </Card>
        <Allergies />
      </div>
    </div>
  );
}
