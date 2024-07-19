'use client';

import { useState } from 'react';
import { toggleVisibility } from './actions';
import { useServerAction } from 'zsa-react';
import { toast } from '@/components/ui/use-toast';

interface Props {
  id: number;
  visible: boolean;
}

export function ToggleVisibilityButton({ id, visible }: Props) {
  const [isVisible, setIsVisible] = useState(visible);

  const { execute, isPending } = useServerAction(toggleVisibility, {
    onError: ({ err }) => {
      toast({ title: 'Error', description: err.message });
    },
    onSuccess: () => {
      toast({ title: 'Success!', description: 'visibility changed succesfully' });
    },
  });

  return (
    <form action={() => execute({ id, visible })}>
      <button
        disabled={isPending}
        onClick={() => setIsVisible(!isVisible)}
        className='group w-12 rounded-full bg-green-200 p-1'>
        <div
          className={`${isVisible ? 'translate-x-0 bg-green-400' : 'translate-x-2/3 bg-green-100'} aspect-square size-6 rounded-full transition group-hover:contrast-50`}
        />
      </button>
    </form>
  );
}
