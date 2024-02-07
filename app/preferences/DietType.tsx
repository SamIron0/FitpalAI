'use client';
import { MdOutlineEggAlt } from 'react-icons/md';
import { IoFastFoodOutline } from 'react-icons/io5';
import { TbSalad } from 'react-icons/tb';
import { GiShrimp } from 'react-icons/gi';
import { GiGrapes } from 'react-icons/gi';
import { GiBroccoli } from 'react-icons/gi';
import { TbMeat } from 'react-icons/tb';
import { PiShrimpBold } from 'react-icons/pi';
import { LuVegan } from 'react-icons/lu';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import toast, { Toast } from 'react-hot-toast';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { UserDetails } from '@/types';
import { postData } from '@/utils/helpers';
import { useRouter } from 'next/navigation';
import { useUserDetails } from '../providers/UserDetailsContext';

const FormSchema = z.object({
  type: z.enum(
    [
      'Anything',
      'Vegetarian',
      'Vegan',
      'Gluten-free',
      'Keto',
      'Paleo',
      'Pescatarian',
      'Mediterranean',
      'Low-Carb'
    ],
    {
      required_error: 'You need to select a diet type.'
    }
  )
});

interface DietTypeProps {
  onSubmit: (diet: string) => void;
}

export default function DietType({ onSubmit }: DietTypeProps) {
  const router = useRouter();

  const { userDetails, setUserDetails } = useUserDetails();

  const [diet, setDiet] = useState('Anything');
  console.log('diet type', diet);

  useEffect(() => {
    if (userDetails?.diet_type) {
      setDiet(userDetails?.diet_type);
    }
  }, [userDetails]);

  const [isLoading, setIsLoading] = useState(false);

  const submit = () => {
    onSubmit(diet);
  };
  return (
    <div className="flex flex-col justify-center items-center w-full max-w-2xl">
      <RadioGroup
        defaultValue={diet}
        onValueChange={(value) => setDiet(value)}
        value={diet}
        className="grid w-full grid-cols-3 gap-4 pb-16"
      >
        <div>
          <RadioGroupItem
            value="Anything"
            id="Anything"
            className="peer sr-only"
          />
          <IoFastFoodOutline className="pb-1 w-6 h-6" />{' '}
          <Label
            htmlFor="Anything"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            Anything
          </Label>
        </div>
        <div>
          <RadioGroupItem
            value="Mediterranean"
            id="Mediterranean"
            className="peer sr-only"
          />
          <Label
            htmlFor="Mediterranean"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <GiGrapes className="pb-1 w-6 h-6" />
            Mediterranean
          </Label>
        </div>
        <div>
          <RadioGroupItem value="Paleo" id="Paleo" className="peer sr-only" />
          <Label
            htmlFor="Paleo"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <TbMeat className="pb-1 w-6 h-6" />
            Paleo
          </Label>
        </div>
        <div>
          <RadioGroupItem value="Vegan" id="Vegan" className="peer sr-only" />
          <Label
            htmlFor="Vegan"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <LuVegan className="pb-1 w-6 h-6" />
            Vegan
          </Label>
        </div>
        <div>
          <RadioGroupItem value="Keto" id="Keto" className="peer sr-only" />
          <Label
            htmlFor="Keto"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            Keto
          </Label>
        </div>
        <div>
          <RadioGroupItem
            value="Vegetarian"
            id="Vegetarian"
            className="peer sr-only"
          />
          <Label
            htmlFor="Vegetarian"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <GiBroccoli className="w-6 h-6 pb-1" />
            Vegetarian
          </Label>
        </div>
        <div>
          <RadioGroupItem
            value="Gluten-free"
            id="Gluten-free"
            className="peer sr-only"
          />
          <TbSalad className="w-6 h-6 pb-1" />
          <Label
            htmlFor="Gluten-free"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            Gluten-free
          </Label>
        </div>
        <div>
          <RadioGroupItem
            value="Pescatarian"
            id="Pescatarian"
            className="peer sr-only"
          />
          <Label
            htmlFor="Pescatarian"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <GiShrimp className="pb-1 w-6 h-6" />
            Pescatarian
          </Label>
        </div>
        <div>
          <RadioGroupItem
            value="Low-Carb"
            id="Low-Carb"
            className="peer sr-only"
          />
          <MdOutlineEggAlt className="w-6 h-6 pb-1" />
          <Label
            htmlFor="Low-Carb"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            Low-Carb
          </Label>
        </div>
      </RadioGroup>

      <Button className="w-full max-w-xl" onClick={() => submit()}>
        Save
      </Button>
    </div>
  );
}
