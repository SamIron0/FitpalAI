'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { IconType } from 'react-icons';
interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  activeCategory: string;
  setActiveCategory: (label: string) => void;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
  activeCategory,
  setActiveCategory
}) => {
  const handleCategoryClick = () => {
    setActiveCategory(label);
  };
  const router = useRouter();
  const params = useSearchParams();
  return (
    <div
      onClick={handleCategoryClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        hover:text-zinc-200
        transition
        cursor-pointer
        ${selected ? 'border-b-zinc-200' : ''}
        ${selected ? 'text-zinc-200' : 'text-zinc-500'}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
