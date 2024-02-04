import { Card } from '@/components/ui/card';
import { SavedPlansUI } from './SavedPlansUI';
import { getSession } from '../supabase-server';
export default async function Pantry() {
  const session = await getSession();
  return (
    <div className="flex w-full">
      <SavedPlansUI />
    </div>
  );
}
