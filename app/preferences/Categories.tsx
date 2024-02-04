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
export function Categories({ activeCategory, setActiveCategory }: CategoriesProps){
  const params = useSearchParams();
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
     <>hello</>
  );
};
