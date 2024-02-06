'use client';

import { postData } from '@/utils/helpers';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from './ui/card';
import { Input } from './ui/input';
import { UserDetails } from '@/types';
import { Separator } from './ui/separator';
import { useEffect, useState } from 'react';
import { EmptyAllergies } from './EmptyAllergies';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useUserDetails } from '@/app/providers/UserDetailsContext';

interface AllergiesProps {
}
export function Allergies() {
  const { userDetails, setUserDetails } = useUserDetails();
  const router = useRouter();
  const [userAllergies, setUserAllergies] = useState<
    string[] | undefined | null
  >(userDetails?.allergies); //userAlle

  const deleteAllergy = async (allergy: string) => {
    console.log('deleting', allergy);
    setIsLoading(true);
    if (allergy.length > 0 && userDetails?.allergies?.includes(allergy)) {
      //const allergies = userDetails?.allergies?.filter((a) => a !== allergy);

      try {
        const updatedDetails: UserDetails = {
          ...userDetails,
          allergies: userAllergies?.filter((a) => a !== allergy)
        };
        const result = await postData({
          url: '/api/upsert-user-details',
          data: { userDetails: updatedDetails }
        });
        setUserAllergies(userAllergies?.filter((a) => a !== allergy));
        toast.success('Allergies updated');
        // router.refresh();
      } catch (error) {
        console.log(error);

        toast.error('Error deleting allergy');
      } finally {
        setIsLoading(false);
      }
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (userDetails?.allergies) {
      setUserAllergies(userDetails?.allergies);
    }
  }, [userDetails?.allergies]);

  const addAllergy = async () => {
    setIsLoading(true);
    const toastId = toast.loading('Adding...');
    if (new_allergy.length > 0) {
      userAllergies?.push(new_allergy);
      const updatedDetails: UserDetails = {
        ...userDetails,
        allergies: userAllergies
      };
      try {
        const result = await postData({
          url: '/api/upsert-user-details',
          data: { userDetails: updatedDetails }
        });
        toast.dismiss(toastId);
        toast.success('Allergy updated');
      } catch (error) {
        console.log(error);
        toast.dismiss(toastId);
        toast.error('Error adding allergy');
      }
    }
    setIsLoading(false);
    setNewAllergy('');
  };
  const [new_allergy, setNewAllergy] = useState<string>('');

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader className="pb-3">
        <CardTitle>Allergies</CardTitle>
        <CardDescription>
          Please enter any allergies that you have.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <Input
            onClick={(e) => e.preventDefault()}
            placeholder="start typing..."
            value={new_allergy}
            onChange={(e) => setNewAllergy(e.target.value)}
            style={{ fontSize: '16px' }}
          />

          <Button onClick={() => addAllergy()} className="shrink-0">
            Add
          </Button>
        </div>
        <Separator className="my-4" />
        {userAllergies?.length === 0 ? (
          <EmptyAllergies />
        ) : (
          <div className="space-y-4">
            <div className="grid gap-6">
              {userAllergies?.map((allergy) => (
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4">
                    <p className="text-sm font-medium leading-none">
                      {allergy}
                    </p>
                  </div>
                  <Button
                    onClick={() => deleteAllergy(allergy)}
                    variant="secondary"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
