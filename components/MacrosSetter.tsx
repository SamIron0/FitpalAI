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
import { useSidebar } from '@/app/providers/SideBarContext';
import { postData } from '@/utils/helpers';
import { UserDetails } from '@/types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface MacroSetterProps {
  userDetails: UserDetails | null | undefined;
}
export function MacrosSetter({ userDetails }: MacroSetterProps) {
  const [protein, setProtein] = React.useState(200);
  const [carbs, setCarbs] = React.useState(200);
  const [fat, setFat] = React.useState(200);

  const [isLoading, setIsLoading] = React.useState(false);

  const macrosQuestions = [
    'Enter your protein goal',
    'Enter your carb goal',
    'Enter your fat goal'
  ];
  const formSchema = z.object({
    protein: z.number().min(2),
    carbs: z.number().min(2),
    fat: z.number().min(2)
  });
  const { isSidebarOpen } = useSidebar();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      protein: userDetails?.macros?.protein,
      carbs: userDetails?.macros?.carbs,
      fat: userDetails?.macros?.fat
    }
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    const toastId = toast.loading('Saving...');
    const updatedDetails: UserDetails = {
      ...userDetails,
      macros: {
        protein: Number(values.protein),
        carbs: Number(values.carbs),
        fat: Number(values.fat)
      }
    };
    try {
      const url = '/api/upsert-user-details';
      const body = { userDetails: updatedDetails };
      const data = await postData({ url, data: body });
      if (!data.ok) {
        toast.error('An error occurred while saving survey.');
      }
      toast.dismiss(toastId);
      toast.success('Macros saved successfully.');
    } catch (error) {
      toast.error(
        'An error occurred while saving macros please try again later.'
      );
    }
  }

  return (
    <div className="flex items-center justify-center space-x-2">
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {macrosQuestions.map((question, idx) => (
            //Unique field for each survey question
            <FormField
              key={idx}
              control={form.control}
              name={idx === 0 ? `protein` : idx === 1 ? `carbs` : `fat`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{question}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={(idx === 0
                        ? userDetails?.macros?.protein
                        : idx === 1
                        ? userDetails?.macros?.carbs
                        : userDetails?.macros?.fat
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
