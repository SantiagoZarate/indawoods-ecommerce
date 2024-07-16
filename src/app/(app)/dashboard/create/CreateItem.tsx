'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { PictureMiniIcon } from '@/components/icons/PictureMiniIcon';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multiSelect';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Fish } from 'lucide-react';
import { categories } from '../../../../constants';
import {
  createItemSchema,
  defaultCreateItemValues,
  type CreateItemSchema,
} from '../../../../utils/zod-schema-validation/itemSchema';
import { SortableImageItem } from './SortableItemImage';

const talles = ['XL', 'M', 'S'];

export function CreateItemForm() {
  const tallesList = talles.map((talle) => ({
    value: talle,
    label: talle,
    icon: Fish,
  }));

  const form = useForm<CreateItemSchema>({
    resolver: zodResolver(createItemSchema),
    defaultValues: defaultCreateItemValues,
  });

  const onSubmit = (data: CreateItemSchema) => {
    console.log(data);
    form.reset();
  };

  const handleDeleteImage = (imageName: string) => {
    const prevImages = form.getValues('images');
    const newImages = prevImages.filter((img) => img.name !== imageName);
    form.setValue('images', newImages);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id === over?.id || !over) return;

    const images = form.getValues('images');

    const activePos = images.findIndex((image) => image.name === active.id);
    const overPos = images.findIndex((image) => image.name === over.id);

    const sortedImages = arrayMove(images, activePos, overPos);

    form.setValue('images', sortedImages);
  };

  const fileRef = form.register('guia_de_talles');

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='new t-shirt' {...field} />
              </FormControl>
              <FormDescription>your new item name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder='new t-shirt' {...field} />
              </FormControl>
              <FormDescription>item description.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a category' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Your item category.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-col gap-2'>
          <label htmlFor='images' className=''>
            Images
            <div className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-neutral-100 p-2 transition hover:-translate-y-1'>
              <PictureMiniIcon />
              <span>add image</span>
            </div>
            <input
              onChange={(e) => {
                console.log(e.target.files);
                const oldImages = form.getValues('images');
                form.setValue('images', [...oldImages, e.target.files![0]]);
              }}
              id='images'
              name='images'
              hidden
              type='file'
            />
          </label>
          {form.watch('images').length > 0 ? (
            <DndContext
              onDragEnd={handleDragEnd}
              collisionDetection={closestCorners}>
              <ul className='flex flex-col divide-y overflow-hidden rounded-lg border border-border'>
                <SortableContext
                  strategy={verticalListSortingStrategy}
                  items={form
                    .watch('images')
                    .map((image) => ({ id: image.name }))}>
                  {form.watch('images').map((image) => (
                    <SortableImageItem
                      onDeleteImage={handleDeleteImage}
                      image={image}
                      key={image.name}
                      id={image.name}
                    />
                  ))}
                </SortableContext>
              </ul>
            </DndContext>
          ) : (
            <div className='mx-auto text-sm'>No images uploaded</div>
          )}
        </div>
        <FormField
          control={form.control}
          name='guia_de_talles'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guia de talles</FormLabel>
              <FormControl>
                <Input
                  type='file'
                  placeholder='new t-shirt'
                  {...fileRef}
                  // {...field}
                  onChange={(event) => {
                    field.onChange(event.target?.files?.[0] ?? undefined);
                  }}
                />
              </FormControl>
              <FormDescription>item description.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='talles'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Size</FormLabel>
              <FormControl>
                <MultiSelect
                  {...field}
                  options={tallesList}
                  onValueChange={(e) => form.setValue('talles', e)}
                  defaultValue={[]}
                  placeholder='Select frameworks'
                  variant='inverted'
                  animation={2}
                  maxCount={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}
