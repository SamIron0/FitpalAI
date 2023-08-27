'use client'
import { useRouter } from 'next/navigation';

import Image from 'next/image'
import {
  getUserDetails,
} from '@/app/supabase-server';
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { IconExternalLink } from '@/components/ui/icons'
import SignOutButton from './ui/sign-out';
function getUserInitials(name: string) {
  const [firstName, lastName] = name.split(' ')
  return lastName ? `${firstName[0]}${lastName[0]}` : firstName.slice(0, 2)
}


export function UserMenu(user: any) {

 // const router = useRouter();
  const { supabase } = useSupabase();

  const logOut = async () => {
    await supabase.auth.signOut();
    //router.push('/signin');
  }

  return (
    <div className="flex items-center justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="pl-0">
            {user?.image ? (
              <></>

            ) : (
              <div className="flex items-center justify-center text-xs font-medium uppercase rounded-full select-none h-7 w-7 shrink-0 bg-muted/50 text-muted-foreground">
                { }
              </div>
            )}
            <span className="ml-2">{ }</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={8} align="start" className="w-[180px]">
          <DropdownMenuItem className="flex-col items-start">
            <div className="text-xs font-medium">{ }</div>
            <div className="text-xs text-zinc-500">{user?.email ?? ''}</div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <a
              href="https://fitpalai.com"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full text-xs"
            >
              Homepage
              <IconExternalLink className="w-3 h-3 ml-auto" />
            </a>
          </DropdownMenuItem>
          <SignOutButton/>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
