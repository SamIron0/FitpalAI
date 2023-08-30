'use client';
import React, { ReactNode, useState, useEffect, useRef } from 'react';
import Textarea from 'react-textarea-autosize'
import { cn } from '@/lib/utils'
import { ExternalLink } from '@/components/external-link'

interface Props {
    title: string;
    footer?: ReactNode;
    children: ReactNode;
    completed: boolean;
}

//let this represent the location of the user
type Geolocation = {
    city: string;
    region_name: string;
    country_name: string;
    // define other fields as per your requirement
}


interface MealPlan {
    [day: string]: { // day1, day2, ...
        breakfast: {
            item: string;
            calories: string;
        };
        lunch: {
            item: string;
            calories: string;
        };
        dinner: {
            item: string;
            calories: string;
        };
        snack: {
            item: string;
            calories: string;
        };
        totalCalories: string;
    };
}interface Meal {
    title: string;
    ingredients: string;
    instructions?: string;
    macros?: {
        protein: string;
        carbs: string;
        fats: string;
    };
    calories?: string;
}
const testMeal: Meal = {
    title: "oatmeal",
    ingredients: "1 cup oatmeal, 2 cups water, pinch of salt, 2 tablespoon honey, 1/2 cup blueberries",
    instructions: "Bring the water to a boil. Stir in the oatmeal and a pinch of salt. Reduce the heat to a simmer and cook for 10-15 minutes, or until the oatmeal is your desired thickness. Stir in the honey and top with blueberries.",
    macros: {
        protein: "5g",
        carbs: "54g",
        fats: "3g"
    },
    calories: "250"
}


function PlanCard({ title, footer, children, completed }: Props) {

    const bgColor = completed ? "bg-zinc-700" : "bg-zinc-700";

    return (
        <div role="status" className="w-full text-sm px-4 py-3 sm:py-1.5 sm:px-3 mb-6 space-y-4 border border-[#232325] bg-[#0D0D0E] divide-y divide-gray-200 rounded shadow dark:divide-gray-700 md:p-6 dark:border-gray-700">
            <div className="flex items-center justify-between">
                <div className="" >
                    <div className='mb-1.5 text-[#006eff] text-bold'>  {title} </div>
                    {children}
                </div>
                <div className='min-w-2/10 text-sm'> {footer} </div>

            </div>

        </div>
    );




} // PlanCard

function GhostCard() {
    return (
        <div role="status" className="w-full p-4 mb-6 space-y-4 border border-[#232325] bg-[#0D0D0E] divide-y divide-gray-200 rounded shadow dark:divide-gray-700 md:p-6 dark:border-gray-700">
            <div className="flex items-center justify-between">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>

        </div>
    );


} // PlanCard

const saveMealPlan = async (mealplan: MealPlan | undefined) => {
    // save meal plan to supabase
    console.log('Preparing to save meal plan')


    if (mealplan) {
        console.log('Saving meal plan')

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

        if (!response.ok) {
            throw new Error(data?.error?.message ?? 'An error occurred while saving meal plan.');
        }
    }
    //return data;
};

export default function HomePageGenerator() {
    const [secondaryMealPlan, setSecondaryMealPlan] = useState<MealPlan>();
    const [tertiaryMealPlan, setTertiaryMealPlan] = useState<MealPlan>();
    const [mealPlan, setMealPlan] = useState<MealPlan>();
    const [primaryMealPlan, setPrimaryMealPlan] = useState<MealPlan>();
    const [breakfastIsLoading, setBreakfastIsLoading] = useState(false)
    const [lunchIsLoading, setLunchIsLoading] = useState(false)
    const [dinnerIsLoading, setDinnerIsLoading] = useState(false)
    const [snack1IsLoading, setSnack1IsLoading] = useState(false)
    const [snack2IsLoading, setSnack2IsLoading] = useState(false)
    const [snack3IsLoading, setSnack3IsLoading] = useState(false)

    const [breakfast, setBreakfast] = useState<Meal | null>(null);
    const [lunch, setLunch] = useState<Meal | null>(null);
    const [dinner, setDinner] = useState<Meal | null>(null);
    const [snack1, setSnack1] = useState<Meal | null>(null);
    const [snack2, setSnack2] = useState<Meal | null>(null);
    const [snack3, setSnack3] = useState<Meal | null>(null);
    const [location, setLocation] = useState<Geolocation>();
    const [region, setRegion] = useState("");
    const [locationFetched, setLocationFetched] = useState(false); // New state variable
    const [primaryIsLoading, setPrimaryIsLoading] = useState(false)
    const [secondaryIsLoading, setSecondaryIsLoading] = useState(false)
    const [tertiaryIsLoading, setTertiaryIsLoading] = useState(false)
    const [calories, setCalories] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [numOfMeals, setNumOfMeals] = useState("1")
    const [generationType, setGenerationType] = useState('create')
    const [allergies, setAllergies] = useState('')
    const [showSecondBox, setShowSecondBox] = useState('false')
    const [recipeLoading, setRecipeLoading] = useState('false')
    const [selectedMeal, setSelectedMeal] = useState("1");
    const [calorieData, setCalorieData] = useState(
        {
            "breakfast": 0,
            "snack1": 0,
            "lunch": 0,
            "snack2": 0,
            "dinner": 0,
            "snack3": 0

        });
    const myRef = useRef<HTMLDivElement>(null);

    const scrollToRef = () => {
        if (myRef.current) {
            myRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const handleMealChange = (event: any) => {
        setSelectedMeal(event.target.value);
    };

    const resetMeals = async () => {
        setBreakfast(null)
        setLunch(null)
        setDinner(null)
        setSnack1(null)
        setSnack2(null)
        setSnack3(null)
    }
    const getBreakfast = async (breakfastCalories: any) => {
        if (breakfastCalories != null) {
            let gotCalories = false

            while (!gotCalories) {
                try {
                    let breakfastResponse = await fetch(`/api/generateBreakfast?calories=${breakfastCalories.text?.dinner}&ingredients=${ingredients}&userLocation=${region}&allergies=${allergies}`);
                    const breakfastData = await breakfastResponse.json();
                    if (breakfastData.meal) {
                        setBreakfast(breakfastData.meal);
                        setBreakfastIsLoading(false);
                        gotCalories = true;

                    }
                } catch (error) {
                    console.error(`Retrying due to ${error}`);
                }
            }
        } else {
            let gotCalories = false

            while (!gotCalories) {
                try {
                    let breakfastResponse = await fetch(`/api/generateBreakfast?ingredients=${ingredients}&userLocation=${region}&allergies=${allergies}`);
                    const breakfastData = await breakfastResponse.json();
                    if (breakfastData.meal) {
                        setBreakfast(breakfastData.meal);
                        setBreakfastIsLoading(false);
                        gotCalories = true;

                    }
                } catch (error) {
                    console.error(`Retrying due to ${error}`);
                }
            }
        }
    }
    const getLunch = async (lunchCalories: any) => {
        if (lunchCalories != null) {
            let gotCalories = false

            while (!gotCalories) {
                try {
                    let lunchResponse = await fetch(`/api/generateLunch?calories=${lunchCalories.text?.dinner}&ingredients=${ingredients}&userLocation=${region}&allergies=${allergies}`);
                    const lunchData = await lunchResponse.json();
                    if (lunchData.meal) {
                        setLunch(lunchData.meal);
                        setLunchIsLoading(false);
                        gotCalories = true;

                    }
                } catch (error) {
                    console.error(`Retrying due to ${error}`);
                }
            }
        } else {
            let gotCalories = false

            while (!gotCalories) {
                try {
                    let lunchResponse = await fetch(`/api/generateLunch?ingredients=${ingredients}&userLocation=${region}&allergies=${allergies}`);
                    const lunchData = await lunchResponse.json();
                    if (lunchData.meal) {
                        setLunch(lunchData.meal);
                        setLunchIsLoading(false);
                        gotCalories = true;

                    }
                } catch (error) {
                    console.error(`Retrying due to ${error}`);
                }
            }
        }
    }
    const getDinner = async (dinnerCalories: any) => {
        if (dinnerCalories != null) {
            let gotCalories = false

            while (!gotCalories) {
                try {
                    let dinnerResponse = await fetch(`/api/generateDinner?calories=${dinnerCalories.text?.dinner}&ingredients=${ingredients}&userLocation=${region}&allergies=${allergies}`);
                    const dinnerData = await dinnerResponse.json();
                    if (dinnerData.meal) {
                        setDinner(dinnerData.meal);
                        setDinnerIsLoading(false);
                        gotCalories = true;

                    }
                } catch (error) {
                    console.error(`Retrying due to ${error}`);
                }
            }
        } else {
            let gotCalories = false

            while (!gotCalories) {
                try {
                    let dinnerResponse = await fetch(`/api/generateDinner?ingredients=${ingredients}&userLocation=${region}&allergies=${allergies}`);
                    const dinnerData = await dinnerResponse.json();
                    if (dinnerData.meal) {
                        setDinner(dinnerData.meal);
                        setDinnerIsLoading(false);
                        gotCalories = true;
                    }
                } catch (error) {
                    console.error(`Retrying due to ${error}`);
                }
            }
        }
    }
    const getSnack = async (snackNumber: any, snackCalories:any ) => {
        if (snackNumber === 1) {
            const getSnack1 = async () => {
                if (snackCalories != null) {
                    let gotCalories = false

                    while (!gotCalories) {
                        try {
                            let snack1Response = await fetch(`/api/generateSnack?calories=${snackCalories.text?.dinner}&ingredients=${ingredients}&userLocation=${region}&allergies=${allergies}`);
                            const snack1Data = await snack1Response.json();
                            if (snack1Data.meal) {
                                setSnack1(snack1Data.meal);
                                setSnack1IsLoading(false);
                                gotCalories = true;

                            }
                        } catch (error) {
                            console.error(`Retrying due to ${error}`);
                        }
                    }
                } else {
                    let gotCalories = false

                    while (!gotCalories) {
                        try {
                            let snack1Response = await fetch(`/api/generateSnack?ingredients=${ingredients}&userLocation=${region}&allergies=${allergies}`);
                            const snack1Data = await snack1Response.json();
                            if (snack1Data.meal) {
                                setSnack1(snack1Data.meal);
                                setSnack1IsLoading(false);
                                gotCalories = true;

                            }
                        } catch (error) {
                            console.error(`Retrying due to ${error}`);
                        }
                    }
                }
            }
        }
        if (snackNumber === 2) {
            const getSnack2 = async () => {
                if (snackCalories != null) {
                    let gotCalories = false

                    while (!gotCalories) {
                        try {
                            let snack2Response = await fetch(`/api/generateSnack?calories=${snackCalories.text?.dinner}&ingredients=${ingredients}&userLocation=${region}&allergies=${allergies}`);
                            const snack2Data = await snack2Response.json();
                            if (snack2Data.meal) {
                                setSnack2(snack2Data.meal);
                                setSnack2IsLoading(false);
                                gotCalories = true;

                            }
                        } catch (error) {
                            console.error(`Retrying due to ${error}`);
                        }
                    }
                } else {
                    let gotCalories = false

                    while (!gotCalories) {
                        try {
                            let snack2Response = await fetch(`/api/generateSnack?ingredients=${ingredients}&userLocation=${region}&allergies=${allergies}`);
                            const snack2Data = await snack2Response.json();
                            if (snack2Data.meal) {
                                setSnack2(snack2Data.meal);
                                setSnack2IsLoading(false);
                                gotCalories = true;

                            }
                        } catch (error) {
                            console.error(`Retrying due to ${error}`);
                        }
                    }
                }
            }
        }
        if (snackNumber === 3) {
            const getSnack3 = async () => {
                if (snackCalories != null) {
                    let gotCalories = false

                    while (!gotCalories) {
                        try {
                            let snack3Response = await fetch(`/api/generateSnack?calories=${snackCalories.text?.dinner}&ingredients=${ingredients}&userLocation=${region}&allergies=${allergies}`);
                            const snack3Data = await snack3Response.json();
                            if (snack3Data.meal) {
                                setSnack3(snack3Data.meal);
                                setSnack3IsLoading(false);
                                gotCalories = true;

                            }
                        } catch (error) {
                            console.error(`Retrying due to ${error}`);
                        }
                    }
                } else {
                    let gotCalories = false

                    while (!gotCalories) {
                        try {
                            let snack3Response = await fetch(`/api/generateSnack?ingredients=${ingredients}&userLocation=${region}&allergies=${allergies}`);
                            const snack3Data = await snack1Response.json();
                            if (snack1Data.meal) {
                                setSnack3(snack3Data.meal);
                                setSnack3IsLoading(false);
                                gotCalories = true;

                            }
                        } catch (error) {
                            console.error(`Retrying due to ${error}`);
                        }
                    }
                }
            }
        }
    }

    const fetchData = async () => {

        if (generationType == 'create') {
            let gotCalories = false;
            let calorieData = null;
            // if user entered a calorie count
            try {
                if (numOfMeals === "1") {
                    setDinnerIsLoading(true);
                }
                else if (numOfMeals === "2") {
                    setLunchIsLoading(true);
                    setDinnerIsLoading(true);
                } else if (numOfMeals === "3") {
                    setBreakfastIsLoading(true);
                    setLunchIsLoading(true);
                    setDinnerIsLoading(true);
                } else if (numOfMeals === "4") {
                    setBreakfastIsLoading(true);
                    setLunchIsLoading(true);
                    setDinnerIsLoading(true);
                    setSnack1IsLoading(true);
                } else if (numOfMeals === "5") {
                    setBreakfastIsLoading(true);
                    setLunchIsLoading(true);
                    setDinnerIsLoading(true);
                    setSnack1IsLoading(true);
                    setSnack2IsLoading(true);
                } else if (numOfMeals === "6") {
                    setBreakfastIsLoading(true);
                    setLunchIsLoading(true);
                    setDinnerIsLoading(true);
                    setSnack1IsLoading(true);
                    setSnack2IsLoading(true);
                    setSnack3IsLoading(true);
                }
                const getCalorieData = async () => {
                    let gotCalories = false

                    while (!gotCalories) {
                        try {
                            if (calories !== "") {
                                const breakDown = await fetch(`/api/getCalorieBreakdown?totalCalories=${calories}&numOfMeals=${numOfMeals}`);
                                calorieData = await breakDown.json();
                                gotCalories = true;
                            }
                        } catch (error) {
                            console.error(`Retrying due to ${error}`);
                        }
                        return "";

                    }
                }
                await getCalorieData();

                if (numOfMeals === "1") {
                    setDinnerIsLoading(true);
                    console.log(calorieData)
                    await Promise.all([getDinner(calorieData)]);
                }

                if (numOfMeals === "2") {
                    setLunchIsLoading(true);
                    setDinnerIsLoading(true);
                    await Promise.all([getLunch(calorieData), getDinner(calorieData)])
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }

                if (numOfMeals === "3") {
                    setBreakfastIsLoading(true);
                    setLunchIsLoading(true);
                    setDinnerIsLoading(true);
                    await Promise.all([getBreakfast(calorieData), getLunch(calorieData), getDinner(calorieData)])
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }

                if (numOfMeals === "4") {
                    setBreakfastIsLoading(true);
                    setLunchIsLoading(true);
                    setDinnerIsLoading(true);
                    setSnack1IsLoading(true);
                    await Promise.all([getBreakfast(calorieData), getLunch(calorieData), getDinner(calorieData), getSnack(1,calorieData)])
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }

                if (numOfMeals === "5") {
                    setBreakfastIsLoading(true);
                    setLunchIsLoading(true);
                    setDinnerIsLoading(true);
                    setSnack1IsLoading(true);
                    setSnack2IsLoading(true);
                    await Promise.all([getBreakfast(calorieData), getLunch(calorieData), getDinner(calorieData), getSnack(1,calorieData), getSnack(2,calorieData)])
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }


                if (numOfMeals === '6') {
                    setBreakfastIsLoading(true);
                    setLunchIsLoading(true);
                    setDinnerIsLoading(true);
                    setSnack1IsLoading(true);
                    setSnack2IsLoading(true);
                    setSnack3IsLoading(true);
                    await Promise.all([getBreakfast(calorieData), getLunch(calorieData), getDinner(calorieData), getSnack(1,calorieData), getSnack(2,calorieData), getSnack(3,calorieData)])
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            } catch {
            }
        }
    };


    const fetchLocation = async () => {
        try {
            const res = await fetch('/api/getLocation');
            if (res.status === 200) { // valid response
                const data = await res.json();
                setRegion(data.location.region_name);
                // console.log(data.location.region_name);
                setLocationFetched(true); // Mark location as fetched
            } else {
                console.error("An error occurred while fetching the location");
            }
        } catch (error) {
            console.error("An error occurred while fetching the location:", error);
        }
    };


    useEffect(() => {
        if (!locationFetched) {
            // Fetch location only if it hasn't been fetched yet
            fetchLocation();
        } else {
            // Fetch data only when location has been fetched

        }
    }, [locationFetched]);

    useEffect(() => {
        if (primaryMealPlan && secondaryMealPlan && tertiaryMealPlan) {
            const combinedPlan: MealPlan = {
                ...primaryMealPlan,
                ...secondaryMealPlan,
                ...tertiaryMealPlan,
            };
            setMealPlan(combinedPlan);
        }
    }, [primaryMealPlan, secondaryMealPlan, tertiaryMealPlan]);
    useEffect(() => {
        if (dinnerIsLoading && myRef.current) {
            scrollToRef();
        }
    }, [dinnerIsLoading]);

    return (
        <div>

            <div className="mx-auto max-w-2xl px-1">
                <div className="rounded-lg border border-[#232325] bg-[#0D0D0E] mt-10 p-6">
                    <div className=" relative  w-full flex justify-center h-[45px]  bg-zinc-900 rounded-lg p-0.5 flex border border-zinc-800">
                        <button
                            onClick={() => setGenerationType('create')}
                            type="button"
                            className={`${generationType === 'create'
                                ? 'relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white'
                                : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-400'
                                } rounded-md m-1 text-sm font-medium whitespace-nowrap focus:outline-none focus:z-10  sm:px-8`}
                        >
                            Create
                        </button>
                        <button
                            onClick={() => setGenerationType('customize')}
                            type="button"
                            className={`${generationType === 'customize'
                                ? 'relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white'
                                : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-400'
                                } rounded-md m-1  text-sm font-medium whitespace-nowrap focus:outline-none focus:z-10  sm:px-8`}
                        >
                            Customize
                        </button>
                    </div>

                    {generationType === 'create'
                        ? <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setShowSecondBox('true')
                                resetMeals()

                                fetchData()
                            }}
                            className="flex pt-6 flex-col w-6/10  items-center">
                            <div className='flex flex-col justify-end'>
                                <div className='my-5 ml-auto'>
                                    <div className="relative flex items-center inline-flex">
                                        <p> I want to eat</p>
                                        <input
                                            value={calories}
                                            onChange={(e) => setCalories(e.target.value)}
                                            className=" px-2 ml-6 bg-transparent border-[1px] border-[#232325] sm:h-[35px] h-[35px] text-md  sm:w-[320px] w-[220px] rounded-md "
                                            placeholder="Calories" />
                                    </div>
                                </div>
                                <div className=' ml-auto mb-5'>
                                    <div className="relative flex items-center inline-flex">
                                        <p className="text-md"> in </p>

                                        <select
                                            onChange={e => setNumOfMeals(e.target.value)}
                                            className=" ml-6 px-2 bg-transparent border-[1px]  border-[#232325]  text-md sm:w-[320px] w-[220px] h-[35px] rounded-md">
                                            <option value="1">1 meal</option>
                                            <option value="2">2 meals</option>
                                            <option value="3">3 meals</option>
                                            <option value="4">4 meals</option>
                                            <option value="5">5 meals</option>
                                            <option value="6">6 meals</option>
                                        </select>
                                    </div>
                                </div>
                                <div className=' mb-6'>
                                    <div className="relative flex items-center inline-flex">
                                        <p> Include these</p>
                                        <textarea
                                            value={ingredients}
                                            onChange={(e) => setIngredients(e.target.value)}
                                            className=" px-2 ml-6 bg-transparent border-[1px] border-[#232325] sm:h-[35px] h-[35px] text-md  sm:w-[320px] w-[220px] rounded-md "
                                            placeholder="Ingredients"
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="group w-3/4 h-[39px] mt-6 sm:w-[220px] rounded-md px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#f5f7f9] text-[#1E2B3A] no-underline active:scale-95 scale-100 duration-75"
                                style={{
                                    boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
                                }}
                            >
                                <span className="text-md"> Generate </span>
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
                        </form>
                        :
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setShowSecondBox('true')
                                resetMeals()
                                fetchData()
                            }}
                            className="flex py-6 flex-col w-6/10  items-center">
                            <div className='flex flex-col justify-end'>
                                <div className='my-5 ml-auto'>
                                    <div className="relative flex items-center inline-flex">
                                        <p> I want to eat</p>
                                        <input
                                            value={calories}
                                            onChange={(e) => setCalories(e.target.value)}
                                            className=" px-2 ml-6 bg-transparent border-[1px] border-[#232325] sm:h-[35px] h-[35px] text-md  sm:w-[320px] w-[220px] rounded-md "
                                            placeholder="Calories" />
                                    </div>
                                </div>
                                <div className=' ml-auto mb-5'>
                                    <div className="relative flex items-center inline-flex">
                                        <p className="text-md"> in </p>

                                        <select className=" ml-6 px-2 bg-transparent border-[1px] border-[#232325] text-md sm:w-[320px] w-[220px] h-[35px] rounded-md">
                                            <option value="1">1 course</option>
                                            <option value="2">2 courses</option>
                                            <option value="3">3 courses</option>
                                        </select>
                                    </div>
                                </div>

                                <div className=' mb-6'>
                                    <div className="relative flex items-center inline-flex">
                                        <p> Include these</p>
                                        <textarea
                                            value={ingredients}
                                            onChange={(e) => setIngredients(e.target.value)}
                                            className=" px-2 ml-6 bg-transparent border-[1px] border-[#232325] sm:h-[35px] h-[35px] text-md  sm:w-[320px] w-[220px] rounded-md "
                                            placeholder="Ingredients"
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"

                                className="group mt-6 w-[375.9px] h-[39px] sm:w-[220px] rounded-md px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#f5f7f9] text-[#1E2B3A] no-underline active:scale-95 scale-100 duration-75"
                                style={{
                                    boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
                                }}
                            >
                                <span className="text-md"> Save </span>
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
                        </form>
                    }
                </div>

                {showSecondBox === 'true'
                    ?
                    <div className="mt-6">
                        {breakfastIsLoading ? (

                            <div>
                                <GhostCard />
                            </div>

                        ) : breakfast ? (
                            <PlanCard
                                title="Breakfast"
                                footer={
                                    <div className="flex items-start justify-between flex-col ">
                                        <p>{`${breakfast.calories}`}</p>
                                    </div>

                                }
                                completed={true}
                            >
                                <div className="mt-1  w-full mb-1">
                                    <p>{`${breakfast.title}`}</p>
                                </div>
                            </PlanCard>
                        ) : null}
                        {lunchIsLoading ? (

                            <div>
                                <GhostCard />
                            </div>


                        ) : lunch ? (
                            <PlanCard
                                title="Lunch"
                                footer={
                                    <div className="flex items-start justify-between flex-col ">
                                        <p>{`${lunch.calories}`}</p>
                                    </div>

                                }
                                completed={true}
                            >
                                <div className="mt-1  w-full mb-1">
                                    <p>{`${lunch.title}`}</p>
                                </div>
                            </PlanCard>
                        ) : null}
                        {dinnerIsLoading ? (
                            <>
                                <div ref={myRef}>
                                    <GhostCard />
                                </div>

                            </>
                        ) : dinner ? (
                            <PlanCard
                                title="Dinner"
                                footer={
                                    <div className="flex items-start justify-between flex-col ">
                                        <p>{`${dinner.calories} cals`}</p>
                                    </div>

                                }
                                completed={true}
                            >
                                <div className="mt-1  w-full mb-1">
                                    <p>{`${dinner.title}`}</p>
                                </div>
                            </PlanCard>
                        ) : null}
                        {snack1IsLoading ? (

                            <div>
                                <GhostCard />
                            </div>


                        ) : snack1 ? (
                            <PlanCard
                                title="Snack1"
                                footer={
                                    <div className="flex items-start justify-between flex-col ">
                                        <p>{`${snack1.calories}`}</p>
                                    </div>

                                }
                                completed={true}
                            >
                                <div className="mt-1  w-full mb-1">
                                    <p>{`${snack1.title}`}</p>
                                </div>
                            </PlanCard>
                        ) : null}
                        {snack2IsLoading ? (

                            <div>
                                <GhostCard />
                            </div>

                        ) : snack2 ? (
                            <PlanCard
                                title="Snack2"
                                footer={
                                    <div className="flex items-start justify-between flex-col ">
                                        <p>{`${snack2.calories}`}</p>
                                    </div>

                                }
                                completed={true}
                            >
                                <div className="mt-1  w-full mb-1">
                                    <p>{`${snack2.title}`}</p>
                                </div>
                            </PlanCard>
                        ) : null}
                        {snack3IsLoading ? (

                            <div>
                                <GhostCard />
                            </div>

                        ) : snack3 ? (
                            <PlanCard
                                title="Snack3"
                                footer={
                                    <div className="flex items-start justify-between flex-col ">
                                        <p>{`${snack3.calories}`}</p>
                                    </div>

                                }
                                completed={true}
                            >
                                <div className="mt-1  w-full mb-1">
                                    <p>{`${snack3.title}`}</p>
                                </div>
                            </PlanCard>
                        ) : null}


                    </div>

                    : <></>
                }
            </div>
        </div >
    )
}

