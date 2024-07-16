import { DraggableIcon } from '@/components/icons/DraggableIcon';
import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TrashIcon } from 'lucide-react';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  id: UniqueIdentifier;
  image: File;
  onDeleteImage: (name: string) => void;
}

export function SortableImageItem({ image, id, onDeleteImage }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
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
      <div className='flex flex-1 items-center gap-4 px-2'>
        <picture className=''>
          <img
            src={image.name}
            className='aspect-square size-16 items-center justify-center rounded-lg border border-border object-cover'
          />
        </picture>
        <div className='flex flex-col gap-2'>
          <p className='text-sm font-bold'>Name</p>
          <p className='text-xs'>{image.name}</p>
        </div>
      </div>
      <div className='flex items-center px-4'>
        <button
          type='button'
          onClick={() => onDeleteImage(image.name)}
          className='z-50 rounded-lg border border-border p-2 transition hover:border-primary'>
          <TrashIcon />
        </button>
      </div>
    </li>
  );
}
