'use client';
import { z } from 'zod';

import { Metadata } from 'next';
import Image from 'next/image';

import { Separator } from '@/components/ui/separator';
import Categories from './Categories';
import { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Allergies } from '@/components/Allergies';
import { UserDetails } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calories } from '@/components/Calories';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { getData, postData } from '@/utils/helpers';
import toast from 'react-hot-toast';
import DietType from './DietType';
import { MacrosSetter } from '@/components/MacrosSetter';
import { useSidebar } from '../providers/SideBarContext';
import { useUserDetails } from '../providers/UserDetailsContext';
import { useRouter } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Forms',
  description: 'Advanced form example using react-hook-form and Zod.'
};

export function PreferencesUI({ id }: { id: string | undefined }) {
  const { userDetails, setUserDetails } = useUserDetails();
  const router = useRouter();

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
  const [activeCategory, setActiveCategory] = useState('Diet Type');

  const { isSidebarOpen } = useSidebar();
  const changeDietType = async (diet: string) => {
    console.log('submitting', diet);
    const toastId = toast.loading('Adding...');
    if (diet) {
      const updatedDetails: UserDetails = {
        ...userDetails,
        diet_type: diet
      };
      try {
        const result = await postData({
          url: '/api/upsert-user-details',
          data: { userDetails: updatedDetails }
        });
        toast.dismiss(toastId);
        toast.success('Diet type updated');
        setUserDetails(updatedDetails);
        router.refresh();
      } catch (error) {
        console.log(error);
        toast.dismiss(toastId);

        toast.error('Error updating your preferences please try again later');
      }
    }
  };


const formSchema = z.object({
  protein: z.string().min(2),
  carbs: z.string().min(2),
  fat: z.string().min(2)
});
const [isLoading, setIsLoading] = useState(false);
  async function setMacros(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
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
      toast.dismiss(toastId);
      toast.success('Macros updated.');
      router.refresh();
    } catch (error) {
      toast.error(
        'An error occurred while saving macros please try again later.'
      );
    }
    setIsLoading(false);
  }



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
        <Separator className="mt-6" />
        <div className="flex flex-col justify-center space-y-5 ">
          <Categories
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          <div className="flex justify-center w-full">
            {activeCategory === 'Diet Type' ? (
              <DietType onSubmit={(diet) => changeDietType(diet)} />
            ) : activeCategory === 'Macros' ? (
              <div className="flex flex-col w-full sm:flex-row">
                <Card className="w-full flex justify-center py-4 sm:w-1/2 mb-4 md:mb-0 md:mr-4">
                  <Calories />
                </Card>
                <Card className="w-full sm:w-1/2 px-2 ">
                  <CardHeader>
                    <CardTitle className="text-muted-foreground">
                      Set your macros
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="w-full">
                    <MacrosSetter onSubmit={(data) => setMacros(data)} />
                  </CardContent>
                </Card>
              </div>
            ) : activeCategory === 'Allergies' ? (
              <Allergies />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
