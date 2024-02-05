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

interface AllergiesProps {
  userDetails: UserDetails | null | undefined;
}
export function Allergies({ userDetails }: AllergiesProps) {
  const deleteAllergy = async (allergy: string) => {
    console.log('deleting', allergy);
    if (allergy.length > 0 && userDetails?.allergies?.includes(allergy)) {
      const updatedDetails: UserDetails = {
        ...userDetails,
        allergies: userDetails?.allergies?.filter((a) => a !== allergy)
      };
      const result = await postData({
        url: '/api/upsert-user-details',
        data: { userDetails: updatedDetails }
      });
      const data = JSON.parse(result.body);
      setUserAllergies(userDetails?.allergies?.filter((a) => a !== allergy));
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const [userAllergies, setUserAllergies] = useState<string[]>([]); //userAlle
  useEffect(() => {
    if (userDetails?.allergies) {
      setUserAllergies(userDetails?.allergies);
    }
  });
  const addAllergy = async () => {
    setIsLoading(true);
    if (new_allergy.length > 0) {
      const allergies = [...(userDetails?.allergies || []), new_allergy];
      const updatedDetails: UserDetails = {
        ...userDetails,
        allergies: allergies
      };
      try {
        const result = await postData({
          url: '/api/upsert-user-details',
          data: { userDetails: updatedDetails }
        });
        const data = JSON.parse(result.body);
        if (!data) {
          toast.error('Error updating your preferences please try again later');
        }
        setUserAllergies(allergies);
      } catch (error) {
        console.log(error);
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
          />

          <Button onClick={() => addAllergy()} className="shrink-0">
            Add
          </Button>
        </div>
        <Separator className="my-4" />
        {userAllergies.length === 0 ? (
          <EmptyAllergies />
        ) : (
          <div className="space-y-4">
            <div className="grid gap-6">
              {userAllergies.map((allergy) => (
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4">
                    <p className="text-sm font-medium leading-none">
                      {allergy}
                    </p>
                  </div>
                  <Button
                    onSubmit={() => deleteAllergy('nuts')}
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
