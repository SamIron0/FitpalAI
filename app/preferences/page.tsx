import { getUserDetails } from '../supabase-server';
import { PreferencesUI } from './PreferencesUI';
import { getSession } from '../supabase-server';
import { postData } from '@/utils/helpers';
export default async function Preferences() {
  const session = await getSession();
  return (
    <div className="w-full">
      <PreferencesUI  id={session?.user?.id} />
    </div>
  );
}
