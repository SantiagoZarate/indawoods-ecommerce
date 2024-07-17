import { PictureMiniIcon } from '@/components/icons/PictureMiniIcon';
import { ImagesList } from './ImagesList';
import { useFormContext } from 'react-hook-form';
import { CreateItemSchema } from '../../../utils/zod-schema-validation/itemSchema';
import { getImageData } from '@/lib/getImageData';
import { useState } from 'react';

export function ImagesField() {
  const form = useFormContext<CreateItemSchema>();
  const [displayImages, setDisplayImages] = useState<string[]>([]);

  const onDeleteDisplayImage = (name: string) => {
    setDisplayImages(displayImages.filter((image) => image !== name));
  };

  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor='images' className=''>
        Images
        <div className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-neutral-100 p-2 transition hover:-translate-y-1'>
          <PictureMiniIcon />
          <span>add image</span>
        </div>
        <input
          accept='image/*'
          onChange={(e) => {
            const { displayUrl } = getImageData(e);
            const oldImages = form.getValues('images');
            form.setValue('images', [...oldImages, e.target.files![0]]);
            setDisplayImages((prevState) => [...prevState, displayUrl]);
          }}
          id='images'
          name='images'
          type='file'
          hidden
        />
      </label>
      {form.watch('images').length > 0 ? (
        <ImagesList
          images={displayImages}
          onDeleteDisplayImage={onDeleteDisplayImage}
        />
      ) : (
        <div className='mx-auto text-sm'>No images uploaded</div>
      )}
    </div>
  );
}
