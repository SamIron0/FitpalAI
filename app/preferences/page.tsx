import { getUserDetails } from '../supabase-server';
import { PreferencesUI } from './PreferencesUI';
import { getSession } from '../supabase-server';
import { postData } from '@/utils/helpers';
export default async function Preferences() {
  const session = await getSession();
  const data = await postData({
    url: '/api/get-user-details',
    data: {
      userId: session?.user?.id || '1'
    }
  });
  console.log('userDetails', data);
  return (
    <div className="w-full">
      <PreferencesUI userDetails={data} />
    </div>
  );
}
