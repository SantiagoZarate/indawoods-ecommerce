import { PictureMiniIcon } from '@/components/icons/PictureMiniIcon';
import { useFormContext } from 'react-hook-form';
import { CreateItemSchema } from '../../../utils/zod-schema-validation/itemSchema';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { ImagesList } from './ImagesList';

export function ImagesField() {
  const form = useFormContext<CreateItemSchema>();

  return (
    <div className='flex flex-col gap-2'>
      <FormField
        control={form.control}
        name='images'
        render={({ field: { ref } }) => (
          <FormItem>
            <FormLabel>
              Imagenes
              <div className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-neutral-100 p-2 transition hover:-translate-y-1'>
                <PictureMiniIcon />
                <span>add image</span>
              </div>
            </FormLabel>
            <FormControl>
              <Input
                className='hidden'
                type='file'
                hidden
                {...ref}
                accept='image/*'
                onChange={(e) => {
                  const oldImages = form.getValues('images');
                  form.setValue('images', [...oldImages, e.target.files![0]]);
                }}
              />
            </FormControl>
            <FormDescription>item images.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      {form.watch('images').length > 0 ? (
        <ImagesList />
      ) : (
        <div className='mx-auto text-sm'>No images uploaded</div>
      )}
    </div>
  );
}
