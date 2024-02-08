import { Button } from './ui/button';

interface Props {
}
export function EmptyPantry() {
  return (
    <div className="flex shrink-0 h-full py-28 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <span>🍲</span>
        <h3 className="mt-4 text-lg font-semibold">COMING SOON</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          You'll be able to save and use the groceries you have in your pantry
        </p>      </div>
    </div>
  );
}
