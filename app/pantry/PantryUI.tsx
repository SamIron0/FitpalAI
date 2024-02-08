import { EmptyPantry } from '@/components/EmptyPantry';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function PantryUI() {
  return (
    <div className="space-y-6 p-6 sm:p-12 pt-20  pb-16 flex flex-col  w-full ">
      <div className="space-y-0.5 flex flex-col">
        <h2 className="text-2xl font-bold tracking-tight">Pantry</h2>
      </div>
      <Separator className="mt-6" />

      <Card className="w-full flex justify-center mx-auto max-w-4xl">
        <EmptyPantry />
      </Card>
    </div>
  );
}
