import { ShopIcon } from '@/components/icons/ShopIcon';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function ShopLink() {
  return (
    <Link href={'/'}>
      <Button variant={'secondary'} className='flex w-full gap-2'>
        <ShopIcon />
        <span className='hidden text-sm md:block'>Shop</span>
      </Button>
    </Link>
  );
}
