'use client';

import { Form } from '@/components/itemForm/Form';
import { toast } from '@/components/ui/use-toast';
import { uploadImage } from '@/lib/uploadImage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { useServerAction } from 'zsa-react';
import { ItemImagenTalleDTO } from '../../../../shared/dto/itemImagenTalleDTO';
import { TalleDTO } from '../../../../shared/dto/talleDTO';
import {
  CreateItemSchema,
  createItemSchemaClient,
} from '../../../../utils/zod-schema-validation/itemSchema';
import { updateItem } from './actions';

interface Props {
  talles: TalleDTO[];
  item: ItemImagenTalleDTO;
}

export default function EditItemPage({ item, talles }: Props) {
  const { id } = useParams();

  const form = useForm<CreateItemSchema>({
    resolver: zodResolver(createItemSchemaClient),
    defaultValues: {
      category: item.category,
      description: item.description,
      guia_de_talles: item.guia_de_talles,
      name: item.name,
      talles: item.item_talle.map((talle) => talle.talle_medida),
      images: item.imagen.map((imagen) => new File([], imagen.url)),
      price: item.price,
    },
  });

  const { execute, isPending } = useServerAction(updateItem, {
    onSuccess: () => {
      toast({ title: 'Item updated', description: 'Item updated succesfully' });
      form.reset();
    },
    onError: () => {
      toast({ title: 'Ooops!', description: 'Error updating an item' });
    },
  });

  const onSubmit = async (payload: CreateItemSchema) => {
    console.log(payload);
    const { images, guia_de_talles, name } = payload;
    const uploadImages = images.map(async (image: File, index: number) => {
      const imageName = `items/${name}-${new Date().toISOString()}-${index}`;
      const publicUrl = await uploadImage(image, imageName);
      return {
        publicUrl,
        sort_order: index + 1,
      };
    });

    const publicImagesURLs = await Promise.all(uploadImages);

    const guiaDeTallesPublicExists =
      (guia_de_talles as FileList).length !== 0 &&
      !(guia_de_talles as FileList)[0].name.startsWith('https://hjftzjtm');

    const guiaDeTallesPublicURL = guiaDeTallesPublicExists
      ? await uploadImage(guia_de_talles, `talles/${name}-guia-de-talles`)
      : undefined;

    execute({
      category: payload.category,
      description: payload.description,
      imagesURL: publicImagesURLs,
      name: payload.name,
      talles: payload.talles,
      guiaDeTallesPublicURL,
      price: payload.price,
      id: Number(id),
    });
  };

  return (
    <FormProvider {...form}>
      <Form isPending={isPending} onSubmit={onSubmit} talles={talles} />;
    </FormProvider>
  );
}
