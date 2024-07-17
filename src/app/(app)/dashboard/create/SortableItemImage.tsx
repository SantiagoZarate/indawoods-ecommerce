import { DraggableIcon } from '@/components/icons/DraggableIcon';
import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TrashIcon } from 'lucide-react';
import { PropsWithChildren } from 'react';
import { PreviewImage } from '@/components/ui/previewImage';

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
      <ItemImage
        imageSRC={image.name}
        onDeleteImage={() => onDeleteImage(image.name)}
      />
    </li>
  );
}

interface Propss extends PropsWithChildren {
  imageSRC: string;
  onDeleteImage: () => void;
}

export function ItemImage({ imageSRC, onDeleteImage }: Propss) {
  return (
    <article className='flex flex-1 justify-between'>
      <div className='flex items-center gap-4 px-2'>
        <PreviewImage src={imageSRC} />
        <div className='flex flex-col gap-2'>
          <p className='text-sm font-bold'>Name</p>
          <p className='text-xs'>{imageSRC}</p>
        </div>
      </div>
      <div className='flex items-center px-4'>
        <button
          type='button'
          onClick={onDeleteImage}
          className='z-50 rounded-lg border border-border p-2 transition hover:border-primary'>
          <TrashIcon />
        </button>
      </div>
    </article>
  );
}
