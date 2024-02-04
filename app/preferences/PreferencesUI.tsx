'use client';
import { Metadata } from 'next';
import Image from 'next/image';

import { Separator } from '@/components/ui/separator';
import Categories from './Categories';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Allergies } from '@/components/Allergies';
import { UserDetails } from '@/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calories } from '@/components/Calories';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { postData } from '@/utils/helpers';
import toast from 'react-hot-toast';
import DietType from './DietType';

export const metadata: Metadata = {
  title: 'Forms',
  description: 'Advanced form example using react-hook-form and Zod.'
};

interface PreferencesUIProps {
  userDetails: UserDetails | null | undefined;
}
export function PreferencesUI({ userDetails }: PreferencesUIProps) {
  const [activeCategory, setActiveCategory] = useState('Diet Type');

  const updateUserDietType = async (data: any) => {
    // updatte user details to have the new diet type
    if (!data) {
      toast.error('Please select a diet type');
      return;
    }
    userDetails = {
      ...userDetails,
      diet_type: data
    };
    try {
      console.log(data);
      const result = await postData({
        url: '/api/update-user-details',
        data: { userDetails: userDetails }
      });
      if (!result) {
        toast.error('Error updating your preferences please try again later');
      }
      toast.success('Your preferences have been updated');
    } catch (error) {
      toast.error('Error updating your preferences please try again later');
    }
  };
  return (
    <div className="space-y-6 p-6 sm:p-12 pt-18  pb-16">
      <div className="space-y-0.5 flex flex-col">
        <h2 className="text-2xl font-bold tracking-tight">Preferences</h2>
        <p className="text-muted-foreground">
          Manage your account preferences and customize your experience
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-5 ">
        <Categories
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <div className="flex-1 justify-center lg:max-w-2xl">
          {activeCategory === 'Diet Type' ? (
            <DietType
              submit={(data) => {
                updateUserDietType(data);
              }}
            />
          ) : activeCategory === 'Macros' ? (
            <Card className="w-full flex justify-center py-4 sm:w-2/5 mb-4 sm:mb-0">
              <Calories
                proteins={userDetails?.macros?.protein}
                fats={userDetails?.macros?.fat}
                carbs={userDetails?.macros?.carbs}
              />
            </Card>
          ) : activeCategory === 'Allergies' ? (
            <Allergies allergies={userDetails?.allergies} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
