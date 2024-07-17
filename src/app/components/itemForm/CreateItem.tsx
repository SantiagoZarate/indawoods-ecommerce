'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  createItemSchema,
  defaultCreateItemValues,
  type CreateItemSchema,
} from '../../../utils/zod-schema-validation/itemSchema';
import { CategoryField } from './CategoryField';
import { DescriptionField } from './DescriptionField';
import { GuiaDeTallesField } from './GuiaDeTallesField';
import { ImagesField } from './ImagesField';
import { NameField } from './NameField';
import { SizeField } from './SizeField';

// TODO - GET Sizes from db
const talles = ['XL', 'M', 'S'];

export function CreateItemForm() {
  const form = useForm<CreateItemSchema>({
    resolver: zodResolver(createItemSchema),
    defaultValues: defaultCreateItemValues,
  });

  const onSubmit = (data: CreateItemSchema) => {
    console.log(data);
    form.reset();
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col space-y-8'>
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
