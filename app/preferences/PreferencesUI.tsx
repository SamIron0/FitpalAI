'use client';
import { Metadata } from 'next';
import Image from 'next/image';

import { Separator } from '@/components/ui/separator';
import Categories from './Categories';
import { useState } from 'react';

export const metadata: Metadata = {
  title: 'Forms',
  description: 'Advanced form example using react-hook-form and Zod.'
};

const sidebarNavItems = [
  {
    title: 'Profile',
    href: '/examples/forms'
  },
  {
    title: 'Account',
    href: '/examples/forms/account'
  },
  {
    title: 'Appearance',
    href: '/examples/forms/appearance'
  },
  {
    title: 'Notifications',
    href: 'preferences/notifications'
  },
  {
    title: 'Display',
    href: '/examples/forms/display'
  }
];

interface PreferencesUIProps {
  children: React.ReactNode;
}
export function PreferencesUI() {
  const [activeCategory, setActiveCategory] = useState('Diet Type');

  return (
    <div className="space-y-6 p-10 pb-16">
      <div className="space-y-0.5 flex flex-col">
        <h2 className="text-2xl font-bold tracking-tight">Preferences</h2>
        <p className="text-muted-foreground">
          Manage your account preferences and customize your experience
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <Categories
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <div className="flex-1 lg:max-w-2xl">
          {activeCategory === 'Diet Type' ? (
            <div>1</div>
          ) : activeCategory === 'Exclusion' ? (
            <div>2</div>
          ) : activeCategory === 'Macros' ? (
            <div>3</div>
          ) : activeCategory === 'Weight' ? (
            <div>4</div>
          ) : activeCategory === 'Goals' ? (
            <div>Goal</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
