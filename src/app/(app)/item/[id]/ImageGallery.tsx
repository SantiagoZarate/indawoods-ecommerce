'use client';

import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { useEffect } from 'react';
import { ImageDTO } from '../../../../shared/dto/imageDTO';

interface Props {
  images: ImageDTO[];
  galleryID: string;
}

export function ImageGallery({ images, galleryID }: Props) {
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '#' + galleryID,
      children: 'a',
      pswpModule: () => import('photoswipe'),
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
    };
  }, []);

  return (
    <ul className='col-span-3 flex flex-col gap-8' id='my-test-gallery'>
      {images.map((image, index) => (
        <a
          href={image.url}
          data-pswp-width={1080}
          data-pswp-height={1080}
          key={galleryID + '-' + index}
          target='_blank'
          rel='noreferrer'>
          <img className='h-full w-full object-cover' src={image.url} alt='' />
        </a>
      ))}
    </ul>
  );
}
