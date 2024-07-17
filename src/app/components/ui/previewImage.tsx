import { ComponentProps } from 'react';
import { PictureMiniIcon } from '../icons/PictureMiniIcon';

interface Props extends ComponentProps<'img'> {
  src: string;
}

export function PreviewImage(args: Props) {
  return (
    <div className='flex aspect-square size-16 w-fit items-center justify-center overflow-hidden rounded-lg bg-neutral-200'>
      {args.src ? (
        <img
          {...args}
          alt='Item image'
          src={args.src}
          className='h-full w-full items-center justify-center border border-border object-cover'
        />
      ) : (
        <span className='p-2'>
          <PictureMiniIcon />
        </span>
      )}
    </div>
  );
}
