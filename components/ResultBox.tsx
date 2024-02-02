import { Meal } from '@/types';
import { ReactNode } from 'react';

interface Props {
  meal?: Meal;
}
export default function ResultBox({ meal }: Props) {
  //const bgColor = completed ? 'bg-zinc-700' : 'bg-zinc-700';

  return (
    <div
      role="status"
      className="w-full text-sm px-4 py-3 mb-3 space-y-4 border border-[#232325] bg-[#0D0D0E] divide-y divide-gray-200 rounded shadow dark:divide-gray-700  dark:border-gray-700"
    >
      <div className="flex w-full items-center justify-between">
        <div className="pr-2">
          <div className="mb-1 text-gray-200 font-bold"> {meal?.title}</div>
        </div>
      </div>
    </div>
  );
} // PlanCard
