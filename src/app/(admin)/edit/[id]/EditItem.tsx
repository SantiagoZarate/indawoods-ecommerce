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

export function imageHasBeenAlreadyUploaded(name: string) {
  return name.startsWith('https://hjftzjtm') || name.startsWith('http://127.0.0.1:54321');
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

  console.log(form.getValues('images'));

  const { execute, isPending } = useServerAction(updateItem, {
    onSuccess: () => {
      toast({ title: 'Item updated', description: 'Item updated succesfully' });
      form.reset();
    },
    onError: ({ err }) => {
      toast({ title: 'Ooops!', description: err.message });
    },
  });

  const onSubmit = async (payload: CreateItemSchema) => {
    const { images, guia_de_talles, name } = payload;

    const imagesURL = await Promise.all(
      images.map(async (image: File, index: number) => {
        const imageName = `items/${name}-${new Date().toISOString()}-${index}`;
        return {
          sort_order: index + 1,
          publicUrl: imageHasBeenAlreadyUploaded(image.name)
            ? image.name
            : await uploadImage(image, imageName),
        };
      }),
    );

    const guiaDeTallesPublicExists =
      (guia_de_talles as FileList).length !== 0 &&
      !imageHasBeenAlreadyUploaded(guia_de_talles as string);

    console.log(guia_de_talles);

    const guiaDeTallesPublicURL = guiaDeTallesPublicExists
      ? await uploadImage(guia_de_talles, `talles/${name}-guia-de-talles`)
      : undefined;

    console.log(imagesURL);

    execute({
      old: { ...item, price: String(item.price) },
      id: Number(id),
      new: {
        category: payload.category,
        description: payload.description,
        imagesURL,
        name: payload.name,
        talles: payload.talles,
        guiaDeTallesPublicURL,
        price: payload.price,
      },
    });
  };

  return (
    <FormProvider {...form}>
      <Form isPending={isPending} onSubmit={onSubmit} talles={talles} />;
    </FormProvider>
  );
}
