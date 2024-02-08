import { EmptyPantry } from '@/components/EmptyPantry';
import { Card } from '@/components/ui/card';

export default function PantryUI() {
  return (
    <div className="w-full h-full p-4 flex-row flex justify-center ">
      <h1 className="pb-5 pt-12 text-3xl"> PANTRY</h1>
      <Card className="w-full max-w-3xl">
        <EmptyPantry />
      </Card>
    </div>
  );
}
