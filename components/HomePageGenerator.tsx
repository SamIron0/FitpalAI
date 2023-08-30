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
}
interface Meal {
    [mealType: string]: {
        title: string;
        ingredients: string;
        instructions: string;
        macros: {
            protein: string;
            carbs: string;
            fats: string;
        };
        calories: string;
    };
}
const testMeal: Meal = {
    "meal": {
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

}

const testPlan: MealPlan = {
    "day1": {
        breakfast: {
            item: "Oatmeal",
            calories: "150"
        },
        lunch: {
            item: "Grilled Chicken Salad",
            calories: "350"
        },
        dinner: {
            item: "Steamed Salmon with veggies",
            calories: "450"
        },
        snack: {
            item: "Green Smoothie",
            calories: "200"
        },
        totalCalories: "1150"
    },

    "day2": {
        breakfast: {
            item: "Oatmeal",
            calories: "150"
        },
        lunch: {
            item: "Grilled Chicken Salad",
            calories: "350"
        },
        dinner: {
            item: "Steamed Salmon with veggies",
            calories: "450"
        },
        snack: {
            item: "Green Smoothie",
            calories: "200"
        },
        totalCalories: "1150"
    },
    "day3": {
        breakfast: {
            item: "Oatmeal",
            calories: "150"
        },
        lunch: {
            item: "Grilled Chicken Salad",
            calories: "350"
        },
        dinner: {
            item: "Steamed Salmon with veggies",
            calories: "450"
        },
        snack: {
            item: "Green Smoothie",
            calories: "200"
        },
        totalCalories: "1150"
    },
    "day4": {
        breakfast: {
            item: "Oatmeal",
            calories: "150"
        },
        lunch: {
            item: "Grilled Chicken Salad",
            calories: "350"
        },
        dinner: {
            item: "Steamed Salmon with veggies",
            calories: "450"
        },
        snack: {
            item: "Green Smoothie",
            calories: "200"
        },
        totalCalories: "1150"
    },
    "day5": {
        breakfast: {
            item: "Oatmeal",
            calories: "150"
        },
        lunch: {
            item: "Grilled Chicken Salad",
            calories: "350"
        },
        dinner: {
            item: "Steamed Salmon with veggies",
            calories: "450"
        },
        snack: {
            item: "Green Smoothie",
            calories: "200"
        },
        totalCalories: "1150"
    }
}
function PlanCard({ title, footer, children, completed }: Props) {

    const bgColor = completed ? "bg-zinc-700" : "bg-zinc-700";
    return (
        <div className={`w-full mb-6 h-[250px] p-0.5 rounded-md flex-shrink-0 flex-grow-0 ${bgColor}`}>
            <div className="bg-black  h-full w-full  rounded-md m-auto">
                <div className='w-full h-full p-4 flex rounded-md  '>
                    <div className=" flex-1 w-8.5/10 h-17/20pt55g ">
                        <h1 className="text-l font-medium">{title}</h1>
                        <div className="" >
                            {children}
                        </div>
                    </div>
                    <div className="h-3/20 w-1.5/10 flex-1 items-center justify-center border-zinc-700 p-2 text-zinc-500 rounded-b-md">
                        {footer}
                    </div>
                </div>
            </div>

        </div>
    );
} // PlanCard

function GhostCard() {
    return (
        <div role="status" className="w-full p-4 mb-6 space-y-4 border border-[#232325] bg-[#0D0D0E] divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
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
    const [calorieData, setCalorieData] = useState({
        "breakdown": {
            "breakfast": 0,
            "snack1": 0,
            "lunch": 0,
            "snack2": 0,
            "dinner": 0,
            "snack3": 0,
        }
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
    const getBreakfast = async () => {
        let breakfastCalories = calorieData?.breakdown?.breakfast || 0;
        if (breakfastCalories > 0) {

            let breakfastResponse = await fetch(`/api/generateBreakfast?calories=${breakfastCalories}&ingredients=${ingredients}&userLocation=${region}&allergies=${allergies}`);
            const breakfastData = await breakfastResponse.json();
            setBreakfast(breakfastData.meal);
            setBreakfastIsLoading(false);
        }
    }
    const getLunch = async () => {
        let lunchCalories = calorieData?.breakdown?.lunch || 0;
        if (lunchCalories > 0) {

            let lunchResponse = await fetch(`/api/generateLunch?calories=${lunchCalories}&ingredients=${ingredients}&userLocation=${region}&allergies=${allergies}`);
            const lunchData = await lunchResponse.json();
            setLunch(lunchData.meal);
            setLunchIsLoading(false);
        }
    }
    const getDinner = async () => {
        console.log(calorieData?.breakdown)
        //let dinnerCalories = calorieData ? calorieData.breakdown.dinner : 0;
        let dinnerCalories = calorieData?.breakdown?.dinner || 0;
        if (dinnerCalories > 0) {
            let dinnerResponse = await fetch(`/api/generateDinner?calories=${dinnerCalories}&ingredients=${ingredients}&userLocation=${region}&allergies=${allergies}`);
            const dinnerData = await dinnerResponse.json();
            setDinner(dinnerData.meal);
            setDinnerIsLoading(false);
        } else {
            let dinnerResponse = await fetch(`/api/generateDinner?ingredients=${ingredients}&userLocation=${region}&allergies=${allergies}`);
            const dinnerData = await dinnerResponse.json();
            setDinner(dinnerData.meal);
            setDinnerIsLoading(false);
        }
    }
    const getSnack = async (snackNumber: any) => {
        if (snackNumber === 1) {
            let snack1Calories = calorieData?.breakdown?.snack1 || 0;
            if (snack1Calories > 0) {
                let snack1Response = await fetch(`/api/generateSnack1?calories=${snack1Calories}&ingredients=${ingredients}&userLocation=${region}&allergies=${allergies}`);
                const snackData = await snack1Response.json();
                setSnack1(snackData.meal);
                setSnack1IsLoading(false);
            }
        }
        if (snackNumber === 2) {
            let snack2Calories = calorieData?.breakdown?.snack2 || 0;
            if (snack2Calories > 0) {
                let snack2Response = await fetch(`/api/generateSnack2?calories=${snack2Calories}&ingredients=${ingredients}&userLocation=${region}&allergies=${allergies}`);
                const snackData = await snack2Response.json();
                setSnack2(snackData.meal);
                setSnack2IsLoading(false);
            }
        }
        if (snackNumber === 3) {
            let snack3Calories = calorieData?.breakdown?.snack3 || 0;

            if (snack3Calories > 0) {
                let snack3Response = await fetch(`/api/generateSnack3?calories=${snack3Calories}&ingredients=${ingredients}&userLocation=${region}&allergies=${allergies}`);
                const snackData = await snack3Response.json();
                setSnack3(snackData.meal);
                setSnack3IsLoading(false);
            }
        }
    }

    const fetchData = async () => {

        if (generationType == 'create') {
            let gotCalories = false;
            // if user entered a calorie count
            try {
                const getCalorieData = async () => {
                    if (calories !== "") {
                        const breakDown = await fetch(`/api/getCalorieBreakdown?totalCalories=${calories}&numOfMeals=${numOfMeals}`);
                        const data = await breakDown.json();
                        gotCalories = true;

                        return data.text;
                    }

                }
                setCalorieData(await getCalorieData());
                //console.log(calorieData)

                if (numOfMeals === "1") {
                    setDinnerIsLoading(true);
                    Promise.all([getDinner()]);
                }

                if (numOfMeals === "2") {
                    setLunchIsLoading(true);
                    setDinnerIsLoading(true);
                    await Promise.all([getLunch(), getDinner()])
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }

                if (numOfMeals === "3") {
                    setBreakfastIsLoading(true);
                    setLunchIsLoading(true);
                    setDinnerIsLoading(true);
                    await Promise.all([getBreakfast(), getLunch(), getDinner()])
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }

                if (numOfMeals === "4") {
                    setBreakfastIsLoading(true);
                    setLunchIsLoading(true);
                    setDinnerIsLoading(true);
                    setSnack1IsLoading(true);
                    await Promise.all([getBreakfast(), getLunch(), getDinner(), getSnack(1)])
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
                    await Promise.all([getBreakfast(), getLunch(), getDinner(), getSnack(1), getSnack(2)])
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
                    await Promise.all([getBreakfast(), getLunch(), getDinner(), getSnack(1), getSnack(2), getSnack(3)])
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
                            onClick={() => setGenerationType('settings')}
                            type="button"
                            className={`${generationType === 'settings'
                                ? 'relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white'
                                : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-400'
                                } rounded-md m-1  text-sm font-medium whitespace-nowrap focus:outline-none focus:z-10  sm:px-8`}
                        >
                            Settings
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
                                            className=" ml-6 px-2 bg-transparent border-[1px] border-gray-200  text-md sm:w-[320px] w-[220px] h-[35px] rounded-md">
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
                                className="group w-[375px] h-[39px] mt-6 sm:w-[220px] rounded-md px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#f5f7f9] text-[#1E2B3A] no-underline active:scale-95 scale-100 duration-75"
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
                        : <form
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

                        ) : breakfast && breakfast.meal ? (
                            <PlanCard
                                title="Breakfast"
                                footer={
                                    <div className="flex items-start justify-between flex-col ">
                                        {breakfast.calories}
                                    </div>

                                }
                                completed={true}
                            >
                                <div className="mt-1  w-full mb-1">
                                    {breakfast.title}
                                </div>
                            </PlanCard>
                        ) : null}
                        {lunchIsLoading ? (

                            <div>
                                <GhostCard />
                            </div>


                        ) : lunch && lunch.meal ? (
                            <PlanCard
                                title="Lunch"
                                footer={
                                    <div className="flex items-start justify-between flex-col ">
                                        {lunch.calories}
                                    </div>

                                }
                                completed={true}
                            >
                                <div className="mt-1  w-full mb-1">
                                    {lunch.title}
                                </div>
                            </PlanCard>
                        ) : null}
                        {dinnerIsLoading ? (
                            <>
                                <div ref={myRef}>
                                    <GhostCard />
                                </div>

                            </>
                        ) : dinner && dinner.meal ? (
                            <PlanCard
                                title="Dinner"
                                footer={
                                    <div className="flex items-start justify-between flex-col ">
                                        {dinner.calories}
                                    </div>

                                }
                                completed={true}
                            >
                                <div className="mt-1  w-full mb-1">
                                    {dinner.title}
                                </div>
                            </PlanCard>
                        ) : null}
                        {snack1IsLoading ? (

                            <div>
                                <GhostCard />
                            </div>


                        ) : snack1 && snack1.meal ? (
                            <PlanCard
                                title="Snack1"
                                footer={
                                    <div className="flex items-start justify-between flex-col ">
                                        {snack1.calories}
                                    </div>

                                }
                                completed={true}
                            >
                                <div className="mt-1  w-full mb-1">
                                    {snack1.title}
                                </div>
                            </PlanCard>
                        ) : null}
                        {snack2IsLoading ? (

                            <div>
                                <GhostCard />
                            </div>

                        ) : snack2 && snack2.meal ? (
                            <PlanCard
                                title="Snack2"
                                footer={
                                    <div className="flex items-start justify-between flex-col ">
                                        {snack2.calories}
                                    </div>

                                }
                                completed={true}
                            >
                                <div className="mt-1  w-full mb-1">
                                    {snack2.title}
                                </div>
                            </PlanCard>
                        ) : null}
                        {snack3IsLoading ? (

                            <div>
                                <GhostCard />
                            </div>

                        ) : snack3 && snack3.meal ? (
                            <PlanCard
                                title="Snack3"
                                footer={
                                    <div className="flex items-start justify-between flex-col ">
                                        {snack3.calories}
                                    </div>

                                }
                                completed={true}
                            >
                                <div className="mt-1  w-full mb-1">
                                    {snack3.title}
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

