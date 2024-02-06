'use client';
import { UserDetails } from '@/types';
import React, { ReactNode, createContext, useContext, useState } from 'react';

interface UserDetailsContext {
  userDetails: UserDetails | undefined;
  setUserDetails: React.Dispatch<React.SetStateAction<UserDetails | undefined>>;
}

export const UserDetailsContext = createContext<UserDetailsContext | undefined>(
  undefined
);

export function UserDetailsProvider({ children }: { children: ReactNode }) {
  const [userDetails, setUserDetails] = useState <UserDetails | undefined>();
  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserDetailsContext.Provider>
  );
}

export const useUserDetails = () => {
  const context = useContext(UserDetailsContext);
  if (context === undefined) {
    throw new Error('useUserDetails must be used within a UserDetailsProvider');
  }
  return context;
};
