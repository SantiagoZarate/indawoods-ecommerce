import { DraggableIcon } from '@/components/icons/DraggableIcon';
import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  id: UniqueIdentifier;
}

export function Sortable({ id, children }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  const styles = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <li style={styles} ref={setNodeRef} className='flex bg-neutral-50'>
      <div
        {...listeners}
        {...attributes}
        className='h-full cursor-pointer border-r border-border p-6 hover:bg-neutral-200'>
        <DraggableIcon />
      </div>
      {children}
    </li>
  );
}
