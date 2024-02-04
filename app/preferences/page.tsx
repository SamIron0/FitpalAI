import { PreferencesUI } from './PreferencesUI';
import { Notifications } from './notifications';
export default async function Preferences() {
  return (
    <div className="flex w-full">
      <PreferencesUI>
        <Notifications />
      </PreferencesUI>
    </div>
  );
}
