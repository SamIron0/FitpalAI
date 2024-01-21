import { ReactNode } from 'react';

interface Props {
  title: string;
  footer?: ReactNode;
  children?: ReactNode;
  completed?: boolean;
}
export default function ResultBox({
  title,
  footer,
  children,
  completed
}: Props) {
  const bgColor = completed ? 'bg-zinc-700' : 'bg-zinc-700';

  return (
    <div
      role="status"
      className="w-full text-sm px-4 py-3 mb-3 space-y-4 border border-[#232325] bg-[#0D0D0E] divide-y divide-gray-200 rounded shadow dark:divide-gray-700  dark:border-gray-700"
    >
      <div className="flex w-full items-center justify-between">
        <div className="pr-2">
          <div className="mb-1 text-[#006eff] font-bold"> {title} </div>
          {children}
        </div>
        <div className="text-sm flex-shrink-0"> {footer} </div>
      </div>
    </div>
  );
} // PlanCard
