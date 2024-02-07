import { Button } from './ui/button';

interface Props {
  onGenerateClick: () => void;
}
export function EmptyMealplans({ onGenerateClick }: Props) {
  return (
    <div className="flex shrink-0 h-full py-36 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <span>🍲</span>
        <h3 className="mt-4 text-lg font-semibold">Nothing to see here</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          You do not have not any mealplans yet.
        </p>
        <Button onClick={onGenerateClick}>Add mealplans</Button>
      </div>
    </div>
  );
}
