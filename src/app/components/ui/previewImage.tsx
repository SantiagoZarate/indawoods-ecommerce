import React, { ComponentProps } from 'react';
import { PictureMiniIcon } from '../icons/PictureMiniIcon';
import Image from 'next/image';

interface Props extends ComponentProps<'img'> {
  src: string;
}

export function PreviewImage(args: Props) {
  console.log(args.src);

  return (
    <div className='flex aspect-square size-16 w-fit items-center justify-center overflow-hidden rounded-lg bg-neutral-200'>
      {args.src ? (
        <Image
          width={64}
          height={64}
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
