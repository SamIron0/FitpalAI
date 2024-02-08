import { EmptyPantry } from '@/components/EmptyPantry';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function PantryUI() {
  return (
    <div className="space-y-6 p-6 sm:p-12 pt-20  pb-16 flex flex-col ">
      <div className="space-y-0.5 flex flex-col">
        <h2 className="text-2xl font-bold tracking-tight">Preferences</h2>
        <p className="text-muted-foreground">
          Manage your account preferences and customize your experience
        </p>
      </div>
      <Separator className="mt-6" />

      <h1 className="pb-5 pt-12 text-3xl"> PANTRY</h1>
      <Card className="w-full max-w-3xl">
        <EmptyPantry />
      </Card>
    </div>
  );
}
