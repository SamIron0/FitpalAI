import { Button } from './ui/button';

interface Props {
  onSetCalories: () => void;
}
export function EmptyCalories({ onSetCalories }: Props) {
  return (
    <div className="flex shrink-0 h-full py-30 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <span>🍲</span>
        <h3 className="mt-4 text-lg font-semibold">Nothing to see here</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          Set your macros to personalize your plan.
        </p>
        <Button onClick={onSetCalories}>Set macros</Button>
      </div>
    </div>
  );
}
