'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useServerAction } from 'zsa-react';

import { createItem } from '@/(admin)/create/actions';
import { uploadImage } from '@/lib/uploadImage';
import { TalleDTO } from '../../../shared/dto/talleDTO';
import {
  createItemSchemaClient,
  defaultCreateItemValues,
  type CreateItemSchema,
} from '../../../utils/zod-schema-validation/itemSchema';
import { toast } from '../ui/use-toast';
import { Form } from './Form';

interface Props {
  talles: TalleDTO[];
}

export function CreateItemForm({ talles }: Props) {
  const form = useForm<CreateItemSchema>({
    resolver: zodResolver(createItemSchemaClient),
    defaultValues: defaultCreateItemValues,
  });

  const { execute, isPending } = useServerAction(createItem, {
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

    const aux = images.map((image, index) => ({
      originalName: image.name,
      publicUrl: '',
      sort_order: index + 1,
    }));

    const uploadImages = images.map(async (image: File, index: number) => {
      const item = aux.find((i) => i.originalName === image.name)!;
      const imageName = `items/${name}-${new Date().toISOString()}-${index}`;
      item.publicUrl = await uploadImage(image, imageName);
    });

    await Promise.all(uploadImages);

    const guiaDeTallesPublicExists = (guia_de_talles as FileList).length !== 0;

    const guiaDeTallesPublicURL = guiaDeTallesPublicExists
      ? await uploadImage(guia_de_talles, `talles/${name}-guia-de-talles`)
      : undefined;

    execute({
      category: newItem.category,
      description: newItem.description,
      name: newItem.name,
      talles: newItem.talles,
      price: newItem.price,
      guiaDeTallesPublicURL,
      imagesURL: aux.map((n) => ({ publicUrl: n.publicUrl, sort_order: n.sort_order })),
    });
  };

  return (
    <FormProvider {...form}>
      <Form isPending={isPending} onSubmit={onSubmit} talles={talles} />;
    </FormProvider>
  );
}
