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

export const metadata: Metadata = {
  title: 'Forms',
  description: 'Advanced form example using react-hook-form and Zod.'
};

interface PreferencesUIProps {
  userDetails: UserDetails;
}
export function PreferencesUI( { userDetails }: PreferencesUIProps) {
  const [activeCategory, setActiveCategory] = useState('Diet Type');

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
        <div className="flex-1 lg:max-w-2xl">
          {activeCategory === 'Diet Type' ? (
            <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
              <div>
                <RadioGroupItem
                  value="Anything"
                  id="Anything"
                  className="peer sr-only"
                />
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
                  Mediterranean
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="Paleo"
                  id="Paleo"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="v"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  Paleo
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="Vegan"
                  id="Vegan"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="Vegan"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="mb-3 h-6 w-6"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                  Vegan
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="Keto"
                  id="Keto"
                  className="peer sr-only"
                />
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
                  Vegetarian
                </Label>
              </div>
            </RadioGroup>
          ) : activeCategory === 'Macros' ? (
            <div>3</div>
          ) : activeCategory === 'Allergies' ? (
            <Allergies allergies={userDetails.allergies} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
