'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useServerAction } from 'zsa-react';

import { createItem } from '@/(app)/dashboard/create/actions';
import { Button } from '@/components/ui/button';
import { uploadImage } from '@/lib/uploadImage';
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
import { TalleDTO } from '../../../shared/dto/talleDTO';

interface Props {
  talles: TalleDTO[];
}

export function CreateItemForm({ talles }: Props) {
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

    const uploadImages = images.map(async (image: File, index: number) => {
      const imageName = `items/${name}-${new Date().toISOString()}-${index}`;
      const publicUrl = await uploadImage(image, imageName);

      return {
        publicUrl,
        sort_order: index + 1,
      };
    });

    const publicImagesURLs = await Promise.all(uploadImages);

    const guiaDeTallesPublicExists = (guia_de_talles as FileList).length !== 0;
    console.log(guia_de_talles);

    const guiaDeTallesPublicURL = guiaDeTallesPublicExists
      ? await uploadImage(guia_de_talles, `talles/${name}-guia-de-talles`)
      : undefined;

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
