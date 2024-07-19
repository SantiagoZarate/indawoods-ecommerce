'use client';

import { logout } from '@/(admin)/login/actions';
import { LogoutIcon } from '@/components/icons/LogoutIcon';
import { Button } from '@/components/ui/button';
import { useServerAction } from 'zsa-react';

export function LogoutButton() {
  const { executeFormAction } = useServerAction(logout);

  return (
    <form action={executeFormAction} className='p-2'>
      <Button className='flex w-full gap-2'>
        <LogoutIcon />
        <span className='text-sm'>Log out</span>
      </Button>
    </form>
  );
}
