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
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Calories } from '@/components/Calories';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { postData } from '@/utils/helpers';
import toast from 'react-hot-toast';
import DietType from './DietType';
import { MacrosSetter } from '@/components/MacrosSetter';
import { useSidebar } from '../providers/SideBarContext';

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
  const isSidebarOpen = useSidebar();
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
      <div className="space-y-6 p-6 sm:p-12 pt-20  pb-16">
        <div className="space-y-0.5 flex flex-col">
          <h2 className="text-2xl font-bold tracking-tight">Preferences</h2>
          <p className="text-muted-foreground">
            Manage your account preferences and customize your experience
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col justify-center space-y-5 ">
          <Categories
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          <div className="flex justify-center w-full">
            {activeCategory === 'Diet Type' ? (
              <DietType
                submit={(data) => {
                  updateUserDietType(data);
                }}
              />
            ) : activeCategory === 'Macros' ? (
              <div className="flex flex-col w-full sm:flex-row">
                <Card className="w-full flex justify-center py-4 sm:w-2/5 mb-4 md:mb-0 md:mr-4">
                  <Calories macros={userDetails?.macros} />
                </Card>
                <Card className="w-full flex justify-center sm:w-3/5 ">
                  <CardTitle className="text-muted-foreground">
                    Set your macros
                  </CardTitle>

                  <CardContent className="w-full">
                    <MacrosSetter userDetails={userDetails} />
                  </CardContent>
                </Card>
              </div>
            ) : activeCategory === 'Allergies' ? (
              <Allergies userDetails={userDetails} />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
