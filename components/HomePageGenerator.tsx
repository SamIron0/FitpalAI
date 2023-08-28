'use client';
import { ReactNode, useState, useEffect } from 'react';
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
    [mealType: string]: { // breakfast, lunch, ...
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
    "breakfast": {

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
                <div className='w-full h-full overflow-hidden p-4 flex flex-col rounded-md  '>
                    <div className=" flex-1 overflow-y-scroll h-17/20pt55g ">
                        <h1 className="text-l font-medium">{title}</h1>
                        <div className="" >
                            {children}
                        </div>
                    </div>
                    <div className="h-3/20 border-zinc-700 bg-zinc-900 p-2 text-zinc-500 rounded-b-md">
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
    const [breakfast, setBreakfast] = useState<Meal>(testMeal);
    const [lunch, setLunch] = useState<Meal>(testMeal);
    const [dinner, setDinner] = useState<Meal>(testMeal);
    const [snack, setSnack] = useState<Meal>(testMeal);
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

    const [showSecondBox, setShowSecondBox] = useState('false')
    const [recipeLoading, setRecipeLoading] = useState('false')
    const [selectedMeal, setSelectedMeal] = useState("1");

    const handleMealChange = (event: any) => {
        setSelectedMeal(event.target.value);
    };
    const fetchData = async (sectionNumber: string | number) => {
        console.log("meals:" + numOfMeals)
        if (generationType == 'create') {
            console.log("hurray")
            try {
                // get the number of meals
                if (numOfMeals === "1") {
                    const response = await fetch(`/api/generate?number=${0}&userLocation=${region}&mealCount=${numOfMeals}&calorieCount=${calories}&ingredients=${ingredients}`);
                }
            } catch {

            }
        }
        //console.log(region); // Now this will show the updated value of region
        setPrimaryIsLoading(true);
        setSecondaryIsLoading(true);
        setTertiaryIsLoading(true);
        try {
            // setLoading(true);
            let response = await fetch(`/api/generate?number=${sectionNumber}&userLocation=${region}`);
            const primaryData = await response.json();
            setPrimaryMealPlan(primaryData.plan);
            setPrimaryIsLoading(false);

            sectionNumber = "2";
            response = await fetch(`/api/generate?number=${sectionNumber}&userLocation=${region}`);
            const secondaryData = await response.json();
            setSecondaryMealPlan(secondaryData.plan);
            setSecondaryIsLoading(false);

            sectionNumber = "3";
            response = await fetch(`/api/generate?number=${sectionNumber}&userLocation=${region}`);
            const tertiaryData = await response.json();
            setTertiaryMealPlan(tertiaryData.plan);
            setTertiaryIsLoading(false);


        } catch (error) {
            console.log(error);
        }
    };


    const fetchLocation = async () => {
        try {
            const res = await fetch('/api/getLocation');
            if (res.status === 200) { // valid response
                const data = await res.json();
                setRegion(data.location.region_name);
                console.log(data.location.region_name);
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
                                fetchData(1)
                                    .catch(error => {
                                        // Handle error here
                                    })
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
                                fetchData(1)

                                    .catch(error => {
                                        // Handle error here
                                    })
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
                        {primaryIsLoading ? (
                            numOfMeals == "1" ?
                                (
                                    <div>
                                        <GhostCard />
                                    </div>
                                ) :
                                numOfMeals == "2" ?
                                    (
                                        <div>
                                            <GhostCard />
                                            <GhostCard />
                                        </div>
                                    ) :
                                    numOfMeals == "3" ?
                                        (
                                            <div>
                                                <GhostCard />
                                                <GhostCard />
                                                <GhostCard />
                                            </div>
                                        ) :
                                        numOfMeals == "4" ?
                                            (
                                                <div>
                                                    <GhostCard />
                                                    <GhostCard />
                                                    <GhostCard />
                                                    <GhostCard />
                                                </div>
                                            ) :
                                            numOfMeals == "5" ?
                                                (
                                                    <div>
                                                        <GhostCard />
                                                        <GhostCard />
                                                        <GhostCard />
                                                        <GhostCard />
                                                        <GhostCard />
                                                    </div>
                                                ) : null

                        ) : secondaryIsLoading ? (
                            primaryMealPlan ? (
                                <>
                                    <PlanCard
                                        title="Breakfast"
                                        footer={
                                            <div>
                                                {primaryMealPlan.day1 ? (
                                                    <div className="flex items-start justify-between flex-col ">
                                                        {"Calories: " + primaryMealPlan.day1.totalCalories}
                                                    </div>
                                                ) : <div> </div>}
                                            </div>
                                        }
                                        completed={true}
                                    >
                                        <div className="mt-1  w-full mb-1">
                                            {primaryMealPlan.day1 ? (
                                                <div className="text-xs ">
                                                    <div className="row">
                                                        {breakfast.breakfast.title}
                                                    </div>

                                                </div>
                                            ) : (
                                                <p></p>
                                            )}
                                        </div>
                                    </PlanCard>
                                    <PlanCard
                                        title="Lunch"
                                        footer={
                                            <div>
                                                {primaryMealPlan.day2 ? (
                                                    <div className="flex items-start justify-between flex-col ">
                                                        {"Calories: " + primaryMealPlan.day2.totalCalories}
                                                    </div>
                                                ) : <div> </div>}
                                            </div>
                                        }
                                        completed={true}
                                    >
                                        <div className="mt-1  w-full mb-1">
                                            {primaryMealPlan.day2 ? (
                                                <div className="text-xs ">
                                                    <div className="row">
                                                        {"Breakfast: "} {primaryMealPlan.day2.breakfast.item}
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        {"Lunch: "} {primaryMealPlan.day2.lunch.item}
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        {"Dinner: "} {primaryMealPlan.day2.dinner.item}
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        {"Snack: "} {primaryMealPlan.day2.snack.item}
                                                    </div>
                                                </div>
                                            ) : (
                                                <p></p>
                                            )}
                                        </div>
                                    </PlanCard>
                                    <GhostCard />
                                    <GhostCard />
                                    <GhostCard />
                                </>
                            ) : <></>
                        ) : tertiaryIsLoading ? (
                            secondaryMealPlan && primaryMealPlan ? (
                                <>
                                    <PlanCard
                                        title="Breakfast"
                                        footer={
                                            <div>
                                                {primaryMealPlan.day1 ? (
                                                    <div className="flex items-start justify-between flex-col ">
                                                        {"Calories: " + primaryMealPlan.day1.totalCalories}
                                                    </div>
                                                ) : <div> </div>}
                                            </div>
                                        }
                                        completed={true}
                                    >
                                        <div className="mt-1  w-full mb-1">
                                            {primaryMealPlan.day1 ? (
                                                <div className="text-xs ">
                                                    <div className="row">
                                                        {breakfast.breakfast.title}
                                                    </div>

                                                </div>
                                            ) : (
                                                <p></p>
                                            )}
                                        </div>
                                    </PlanCard>
                                    <PlanCard
                                        title="Lunch"
                                        footer={
                                            <div>
                                                {primaryMealPlan.day2 ? (
                                                    <div className="flex items-start justify-between flex-col ">
                                                        {"Calories: " + primaryMealPlan.day2.totalCalories}
                                                    </div>
                                                ) : <div> </div>}
                                            </div>
                                        }
                                        completed={true}
                                    >
                                        <div className="mt-1  w-full mb-1">
                                            {primaryMealPlan.day2 ? (
                                                <div className="text-xs ">
                                                    <div className="row">
                                                        {"Breakfast: "} {primaryMealPlan.day2.breakfast.item}
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        {"Lunch: "} {primaryMealPlan.day2.lunch.item}
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        {"Dinner: "} {primaryMealPlan.day2.dinner.item}
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        {"Snack: "} {primaryMealPlan.day2.snack.item}
                                                    </div>
                                                </div>
                                            ) : (
                                                <p></p>
                                            )}
                                        </div>
                                    </PlanCard>
                                    <PlanCard
                                        title="Dinner"
                                        footer={
                                            <div>
                                                {secondaryMealPlan.day3 ? (
                                                    <div className="flex items-start justify-between flex-col ">
                                                        {"Calories: " + secondaryMealPlan.day3.totalCalories}
                                                    </div>
                                                ) : <div> </div>}
                                            </div>
                                        }
                                        completed={true}
                                    >
                                        <div className="mt-1  w-full mb-1">
                                            {secondaryMealPlan.day3 ? (
                                                <div className="text-xs ">
                                                    <div className="row">
                                                        {"Breakfast: "} {secondaryMealPlan.day3.breakfast.item}
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        {"Lunch: "} {secondaryMealPlan.day3.lunch.item}
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        {"Dinner: "} {secondaryMealPlan.day3.dinner.item}
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        {"Snack: "} {secondaryMealPlan.day3.snack.item}
                                                    </div>
                                                </div>
                                            ) : (
                                                <p></p>
                                            )}
                                        </div>
                                    </PlanCard>
                                    <PlanCard
                                        title="Snack"
                                        footer={
                                            <div>
                                                {secondaryMealPlan.day4 ? (
                                                    <div className="flex items-start justify-between flex-col ">
                                                        {"Calories: " + secondaryMealPlan.day4.totalCalories}
                                                    </div>
                                                ) : <div> </div>}
                                            </div>
                                        }
                                        completed={true}
                                    >
                                        <div className="mt-1  w-full mb-1">
                                            {secondaryMealPlan.day4 ? (
                                                <div className="text-xs ">
                                                    <div className="row">
                                                        {"Breakfast: "} {secondaryMealPlan.day4.breakfast.item}
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        {"Lunch: "} {secondaryMealPlan.day4.lunch.item}
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        {"Dinner: "} {secondaryMealPlan.day4.dinner.item}
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        {"Snack: "} {secondaryMealPlan.day4.snack.item}
                                                    </div>
                                                </div>
                                            ) : (
                                                <p></p>
                                            )}
                                        </div>
                                    </PlanCard>
                                    <GhostCard />
                                </>
                            ) : <></>
                        ) : primaryMealPlan && tertiaryMealPlan && secondaryMealPlan ?
                            (<>
                                <PlanCard
                                    title="Breakfast"
                                    footer={
                                        <div>
                                            {primaryMealPlan.day1 ? (
                                                <div className="flex items-start justify-between flex-col ">
                                                    {"Calories: " + primaryMealPlan.day1.totalCalories}
                                                </div>
                                            ) : <div> </div>}
                                        </div>
                                    }
                                    completed={true}
                                >
                                    <div className="mt-1  w-full mb-1">
                                        {primaryMealPlan.day1 ? (
                                            <div className="text-xs ">
                                                <div className="row">
                                                    {breakfast.breakfast.title}
                                                </div>
                                            </div>
                                        ) : (
                                            <p></p>
                                        )}

                                    </div>
                                </PlanCard>
                                <PlanCard
                                    title="Lunch"
                                    footer={
                                        <div>
                                            {primaryMealPlan.day2 ? (
                                                <div className="flex items-start justify-between flex-col ">
                                                    {"Calories: " + primaryMealPlan.day2.totalCalories}
                                                </div>
                                            ) : <div> </div>}
                                        </div>
                                    }
                                    completed={true}
                                >
                                    <div className="mt-1  w-full mb-1">
                                        {primaryMealPlan.day2 ? (
                                            <div className="text-xs ">
                                                <div className="row">
                                                    {"Breakfast: "} {primaryMealPlan.day2.breakfast.item}
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    {"Lunch: "} {primaryMealPlan.day2.lunch.item}
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    {"Dinner: "} {primaryMealPlan.day2.dinner.item}
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    {"Snack: "} {primaryMealPlan.day2.snack.item}
                                                </div>
                                            </div>
                                        ) : (
                                            <p></p>
                                        )}
                                    </div>
                                </PlanCard>
                                <PlanCard
                                    title="Dinner"
                                    footer={
                                        <div>
                                            {secondaryMealPlan.day3 ? (
                                                <div className="flex items-start justify-between flex-col ">
                                                    {"Calories: " + secondaryMealPlan.day3.totalCalories}
                                                </div>
                                            ) : <div> </div>}
                                        </div>
                                    }
                                    completed={true}
                                >
                                    <div className="mt-1  w-full mb-1">
                                        {secondaryMealPlan.day3 ? (
                                            <div className="text-xs ">
                                                <div className="row">
                                                    {"Breakfast: "} {secondaryMealPlan.day3.breakfast.item}
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    {"Lunch: "} {secondaryMealPlan.day3.lunch.item}
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    {"Dinner: "} {secondaryMealPlan.day3.dinner.item}
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    {"Snack: "} {secondaryMealPlan.day3.snack.item}
                                                </div>
                                            </div>
                                        ) : (
                                            <p></p>
                                        )}
                                    </div>
                                </PlanCard>
                                <PlanCard
                                    title="Snack"
                                    footer={
                                        <div>
                                            {secondaryMealPlan.day4 ? (
                                                <div className="flex items-start justify-between flex-col ">
                                                    {"Calories: " + secondaryMealPlan.day4.totalCalories}
                                                </div>
                                            ) : <div> </div>}
                                        </div>
                                    }
                                    completed={true}
                                >
                                    <div className="mt-1  w-full mb-1">
                                        {secondaryMealPlan.day4 ? (
                                            <div className="text-xs ">
                                                <div className="row">
                                                    {"Breakfast: Scrambled eggs"}
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    {"Lunch: "} {secondaryMealPlan.day4.lunch.item}
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    {"Dinner: "} {secondaryMealPlan.day4.dinner.item}
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    {"Snack: "} {secondaryMealPlan.day4.snack.item}
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
                                            {tertiaryMealPlan.day5 ? (
                                                <div className="flex items-start justify-between flex-col ">
                                                    {"Calories: " + tertiaryMealPlan.day5.totalCalories}
                                                </div>
                                            ) : <div> </div>}
                                        </div>
                                    }
                                    completed={true}
                                >
                                    <div className="mt-1  w-full mb-1">
                                        {tertiaryMealPlan.day5 ? (
                                            <div className="text-xs ">
                                                <div className="row">
                                                    {"Breakfast: "} {tertiaryMealPlan.day5.breakfast.item}
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    {"Lunch: "} {tertiaryMealPlan.day5.lunch.item}
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    {"Dinner: "} {tertiaryMealPlan.day5.dinner.item}
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    {"Snack: "} {tertiaryMealPlan.day5.snack.item}
                                                </div>
                                            </div>
                                        ) : (
                                            <p></p>
                                        )}
                                    </div>
                                </PlanCard>
                            </>
                            ) : <></>
                        }
                    </div>

                    : <></>
                }
            </div>
        </div>
    )
}

