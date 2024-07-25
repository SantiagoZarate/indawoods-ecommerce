import { TrashIcon } from '@/components/icons/TrashIcon';
import { PropsWithChildren } from 'react';
import { PreviewImage } from '../ui/previewImage';

interface Props extends PropsWithChildren {
  imageSRC: string;
  onDeleteImage: () => void;
}

export function ItemImage({ imageSRC, onDeleteImage }: Props) {
  return (
    <article className='flex flex-1 justify-between'>
      <div className='flex items-center gap-4 px-2'>
        <PreviewImage src={imageSRC} />
        <div className='flex flex-col gap-2'>
          <p className='text-sm font-bold'>Name</p>
          <p className='text-xs'>{imageSRC.slice(40)}</p>
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
