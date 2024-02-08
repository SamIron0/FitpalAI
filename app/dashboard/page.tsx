import { Card } from '@/components/ui/card';
import { DashboardUI } from './DashboardUI';
import { getSession } from '../supabase-server';
import { redirect } from 'next/navigation';
export default async function Pantry() {
  const session = await getSession();
  if(!session?.user){
    redirect('/signin');
  }
  return (
    
    <div className="flex w-full">
      <DashboardUI user={session?.user} />
    </div>
  );
}
