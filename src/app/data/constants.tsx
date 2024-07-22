import { InvisibleCubeIcon } from '@/components/icons/InvisibleCubeIcon';
import { SortIcon } from '@/components/icons/SortIcon';
import { ThreeLinesIcon } from '@/components/icons/ThreeLinesIcon';

export const ASIDE_MENU_LINKS = [
  {
    icon: <ThreeLinesIcon />,
    href: '/dashboard',
    text: 'dashboard',
  },
  {
    icon: <InvisibleCubeIcon />,
    href: '/create',
    text: 'create item',
  },
  {
    icon: <SortIcon />,
    href: '/sort',
    text: 'sort items',
  },
];
