'use client';

import { createItem } from '@/(admin)/create/actions';
import { CategoryField } from '@/components/itemForm/CategoryField';
import { DescriptionField } from '@/components/itemForm/DescriptionField';
import { GuiaDeTallesField } from '@/components/itemForm/GuiaDeTallesField';
import { ImagesField } from '@/components/itemForm/ImagesField';
import { NameField } from '@/components/itemForm/NameField';
import { SizeField } from '@/components/itemForm/SizeField';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { uploadImage } from '@/lib/uploadImage';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useServerAction } from 'zsa-react';
import { ItemImagenTalleDTO } from '../../../../shared/dto/itemImagenTalleDTO';
import { TalleDTO } from '../../../../shared/dto/talleDTO';
import {
  CreateItemSchema,
  createItemSchemaClient,
} from '../../../../utils/zod-schema-validation/itemSchema';

interface Props {
  talles: TalleDTO[];
  item: ItemImagenTalleDTO;
}

export default function EditItemPage({ item, talles }: Props) {
  const form = useForm<CreateItemSchema>({
    resolver: zodResolver(createItemSchemaClient),
    defaultValues: {
      category: item.category,
      description: item.description,
      guia_de_talles: item.guia_de_talles,
      name: item.name,
      talles: item.item_talle.map((talle) => talle.talle_medida),
      images: item.imagen.map((imagen) => new File([], imagen.url)),
    },
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
        <SizeField talles={talles} defaultSelected={form.getValues('talles')} />
        <Button type='submit'>Submit</Button>
      </form>
    </FormProvider>
  );
}
