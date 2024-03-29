'use client';
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
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
import { Input } from '@/components/ui/input';
import { User } from '@supabase/supabase-js';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { postData } from '@/utils/helpers';
import { UserDetails } from '@/types';
import { useUserDetails } from '@/app/providers/UserDetailsContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const formSchema = z.object({
  protein: z.string().min(2),
  carbs: z.string().min(2),
  fat: z.string().min(2),
  calories: z.string().min(3)
});
interface MacrosSetterProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}
export function MacrosSetter({ onSubmit }: MacrosSetterProps) {
  const { userDetails, setUserDetails } = useUserDetails();
  const [protein, setProtein] = React.useState(200);
  const [carbs, setCarbs] = React.useState(200);
  const [fat, setFat] = React.useState(200);
  const [calories, setCalories] = React.useState(2000);

  const [isLoading, setIsLoading] = React.useState(false);

  const macrosQuestions = [
    'Enter your protein goal',
    'Enter your carbs goal',
    'Enter your fats goal',
    'Enter your calorie goal'
  ];
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      protein: userDetails?.macros?.protein.toString(),
      carbs: userDetails?.macros?.carbs.toString(),
      fat: userDetails?.macros?.fat.toString(),
      calories: userDetails?.macros?.total_calories?.toString() || '0'
    }
  });

  // 2. Define a submit handler.

  return (
    <div className="flex items-center w-full justify-center space-x-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full max-w-3xl"
        >
          {macrosQuestions.map((question, idx) => (
            //Unique field for each survey question
            <FormField
              key={idx}
              control={form.control}
              name={
                idx === 0
                  ? `protein`
                  : idx === 1
                  ? `carbs`
                  : idx === 2
                  ? `fat`
                  : `calories`
              }
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{question}</FormLabel>
                  <FormControl>
                    <Input
                      style={{ fontSize: '16px' }}
                      placeholder={(idx === 0
                        ? userDetails?.macros?.protein
                        : idx === 1
                        ? userDetails?.macros?.carbs
                        : idx === 2
                        ? userDetails?.macros?.fat
                        : userDetails?.macros?.total_calories
                      )?.toString()}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit">Save</Button>
        </form>
      </Form>
    </div>
  );
}
