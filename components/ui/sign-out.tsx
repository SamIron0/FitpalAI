'use client';

import { useSupabase } from '@/app/supabase-provider';
import { useRouter } from 'next/navigation';

import s from './Navbar.module.css';
import {
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

export default function SignOutButton() {
    const router = useRouter();
    const { supabase } = useSupabase();
    return (
        <>
            <DropdownMenuItem
                onClick={
                    async () => {
                        await supabase.auth.signOut();
                        router.push('/signin');
                    }
                }
            >
                Log Out
            </DropdownMenuItem>

        </>
    );
}
