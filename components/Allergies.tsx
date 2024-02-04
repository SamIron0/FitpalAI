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
import { useState } from 'react';

export function Allergies({ allergies }: { allergies?: string[] | null }) {
  const deleteAllergy = (allergy: string) => {
    if (allergy.length > 0 && allergies?.includes(allergy)) {
      
      postData({ url: '/api/upsert-user-details', data: { allergy } });
    }
  };
  const addAllergy = (allergy: string) => {
    if (allergy.length > 0 && !allergies?.includes(allergy)) {
      postData({ url: '/api/upsert-user-details', data: { allergy } });
    }
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
          <Input placeholder='start typing...' value={new_allergy} onChange={(e) => setNewAllergy(e.target.value)}/>
            
          <Button onClick={() => addAllergy(new_allergy)} className="shrink-0">
            Add
          </Button>
        </div>
        <Separator className="my-4" />
        <div className="space-y-4">
          <div className="grid gap-6">
            {allergies?.map((allergy) => (
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <p className="text-sm font-medium leading-none">{allergy}</p>
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
      </CardContent>
    </Card>
  );
}
