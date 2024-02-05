import { getUserDetails } from '../supabase-server';
import { PreferencesUI } from './PreferencesUI';
import { getSession } from '../supabase-server';
export default async function Preferences() {
  const session = await getSession();
  const userDetails = await getUserDetails(session?.user?.id || '1');
  console.log('userDetails', userDetails);
  return (
    <div className="w-full">
      <PreferencesUI userDetails={userDetails} />
    </div>
  );
}
