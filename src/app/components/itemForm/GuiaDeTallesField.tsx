import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { getImageData } from '@/lib/getImageData';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { CreateItemSchema } from '../../../utils/zod-schema-validation/itemSchema';
import { PictureMiniIcon } from '../icons/PictureMiniIcon';
import { ItemImage } from './ItemImage';

export function GuiaDeTallesField() {
  const form = useFormContext<CreateItemSchema>();

  const [preview, setPreview] = useState(form.watch('guia_de_talles') ?? '');
  const fileRef = form.register('guia_de_talles');

  return (
    <FormField
      control={form.control}
      name='guia_de_talles'
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Guia de talles (Optional)
            <div className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-neutral-100 p-2 transition hover:-translate-y-1'>
              <PictureMiniIcon />
              <span>add image</span>
            </div>
          </FormLabel>
          <article className='flex items-center gap-2'>
            {preview ? (
              <ItemImage imageSRC={preview} onDeleteImage={() => setPreview('')} />
            ) : (
              <div className='mx-auto text-sm'>No image uploaded</div>
            )}
            <FormControl>
              <Input
                className='hidden'
                type='file'
                hidden
                {...fileRef}
                accept='image/*'
                onChange={(event) => {
                  const { file, displayUrl } = getImageData(event);
                  setPreview(displayUrl);
                  field.onChange(file);
                }}
              />
            </FormControl>
          </article>
          <FormDescription>item description.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
