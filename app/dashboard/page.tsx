import { Card } from '@/components/ui/card';
import { DashboardUI } from './DashboardUI';
import { getSession } from '../supabase-server';
export default async function Pantry() {
  const session = await getSession();
  return (
    <div className="flex w-full">
      <DashboardUI user={session?.user} />
    </div>
  );
}
