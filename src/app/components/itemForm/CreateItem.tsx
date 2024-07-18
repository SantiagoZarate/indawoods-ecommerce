'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useServerAction } from 'zsa-react';

import { createItem } from '@/(app)/dashboard/create/actions';
import { Button } from '@/components/ui/button';
import { createClient } from '../../../utils/supabase/client';
import {
  createItemSchemaClient,
  defaultCreateItemValues,
  type CreateItemSchema,
} from '../../../utils/zod-schema-validation/itemSchema';
import { toast } from '../ui/use-toast';
import { CategoryField } from './CategoryField';
import { DescriptionField } from './DescriptionField';
import { GuiaDeTallesField } from './GuiaDeTallesField';
import { ImagesField } from './ImagesField';
import { NameField } from './NameField';
import { SizeField } from './SizeField';

// TODO - GET Sizes from db
const talles = ['XL', 'M', 'S'];

async function uploadImage(image: File, imageName: string): Promise<string> {
  const supabase = createClient();

  const { error } = await supabase.storage.from('ecommerce').upload(imageName, image, {
    cacheControl: '3600',
    upsert: true,
  });

  if (error) {
    throw new Error('');
  }

  const {
    data: { publicUrl },
  } = await supabase.storage.from('ecommerce').getPublicUrl(imageName);

  console.log(publicUrl);
  return publicUrl;
}

export function CreateItemForm() {
  const form = useForm<CreateItemSchema>({
    resolver: zodResolver(createItemSchemaClient),
    defaultValues: defaultCreateItemValues,
  });

  const { execute } = useServerAction(createItem, {
    onSuccess: () => {
      toast({ title: 'Item created', description: 'Item created succesfully' });
      form.reset();
    },
    onError: () => {
      toast({ title: 'Ooops!', description: 'Error creating a new item' });
    },
  });

  const onSubmit = async (newItem: CreateItemSchema) => {
    const { images, guia_de_talles, name } = newItem;
    console.log(guia_de_talles);
    let publicImagesURLs: { publicUrl: string; sort_order: number }[] = [];

    const uploadImages = images.map(async (image: File, index: number) => {
      const imageName = `items/${name}-${new Date().toISOString()}`;
      const publicUrl = await uploadImage(image, imageName);

      return {
        publicUrl,
        sort_order: index + 1,
      };
    });

    publicImagesURLs = await Promise.all(uploadImages);
    console.log(publicImagesURLs);

    const guiaDeTallesPublicURL =
      guia_de_talles &&
      (await uploadImage(guia_de_talles, `talles/${name}-guia-de-talles-${new Date()}`));

    execute({
      category: newItem.category,
      description: newItem.description,
      imagesURL: publicImagesURLs,
      name: newItem.name,
      talles: newItem.talles,
      guiaDeTallesPublicURL,
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-8'>
        <NameField />
        <DescriptionField />
        <CategoryField />
        <ImagesField />
        <GuiaDeTallesField />
        <SizeField talles={talles} />
        <Button type='submit'>Submit</Button>
      </form>
    </FormProvider>
  );
}
