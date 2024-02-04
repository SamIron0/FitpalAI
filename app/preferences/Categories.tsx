'use client';

import CategoryBox from './CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';
import { MdFlight, MdOutlineVilla } from 'react-icons/md';
import {
  TbBeach,
  TbCar,
  TbMountain,
  TbMovie,
  TbPool,
  TbSchool,
  TbShoppingCart
} from 'react-icons/tb';

export const categories = [
  {
    label: 'Diet Type',
    icon: TbCar,
    description: 'View All Available Destinations!'
  },
  {
    label: 'Exclusions',
    icon: TbShoppingCart,
    description: 'This property is has windmills!'
  },
  {
    label: 'Macros',
    icon: MdFlight,
    description: 'This property is modern!'
  },
  {
    label: 'Weight',
    icon: TbSchool,
    description: 'This property is in the countryside!'
  },
  {
    label: 'Goal',
    icon: TbMovie,
    description: 'Wanna see a movie?!'
  }
];

interface CategoriesProps {
  activeCategory: string;
  setActiveCategory: (label: string) => void;
}
const Categories = ({ activeCategory, setActiveCategory }: CategoriesProps) => {
  const params = useSearchParams();
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <div>
      hi{' '}
      <div
        className="
        pt-4 flex px-10 sm:px-24 md:px-44 lg:px-64 xl:px-80 flex-row items-center justify-between overflow-x-auto"
      >
        {categories.map((item, index) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={activeCategory === item.label}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            // Apply margin-right except for the last item
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
