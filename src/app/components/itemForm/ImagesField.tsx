import { PictureMiniIcon } from '@/components/icons/PictureMiniIcon';
import { useFormContext } from 'react-hook-form';
import { CreateItemSchema } from '../../../utils/zod-schema-validation/itemSchema';
import { ImagesList } from './ImagesList';

export function ImagesField() {
  const form = useFormContext<CreateItemSchema>();

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
            const oldImages = form.getValues('images');
            form.setValue('images', [...oldImages, e.target.files![0]]);
          }}
          id='images'
          name='images'
          type='file'
          hidden
        />
      </label>
      {form.watch('images').length > 0 ? (
        <ImagesList />
      ) : (
        <div className='mx-auto text-sm'>No images uploaded</div>
      )}
    </div>
  );
}
