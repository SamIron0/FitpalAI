import { getUserDetails } from '../supabase-server';
import { PreferencesUI } from './PreferencesUI';
export default async function Preferences() {
  const userDetails = await getUserDetails();
  return (
    <div className="w-full">
      <PreferencesUI userDetails={userDetails}  />
    </div>
  );
}
