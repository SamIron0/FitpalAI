interface Props {
  icon: string;
  caption: string;
  onclick: () => void;
}
export default function SuggestionPill({ icon, caption, onclick }: Props) {
  return (
    <button
      onClick={onclick}
      className="text-xs mb-2 font-medium inline-block   items-center px-2.5 py-0.5 rounded-lg me-3 bg-zinc-800 text-gray-400 border border-zinc-600"
    >
      <div className="flex items-center">
        {icon}
        <p className="pl-0.5 flex-nowrap">{caption}</p>
      </div>
    </button>
  );
}
