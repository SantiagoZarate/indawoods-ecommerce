import { z } from 'zod';
import { categories } from '../../constants';

const imageSchema = z
  .instanceof(FileList)
  .transform((list) => list.item(0)! as File)
  .refine(
    (file) =>
      ['image/png', 'image/jpeg', 'image/jpg'].some(
        (type) => type === file.type,
      ),
    'invalid image type',
  )
  .refine(
    (file) => file.size <= 5 * 1024 * 1024,
    'Image must be less than 5 MB',
  );

export const createItemSchema = z.object({
  category: z.enum(categories),
  name: z
    .string()
    .min(4, { message: 'Item name should be larger than 4 characters' }),
  description: z
    .string()
    .min(4, { message: 'Item description should be larger than 4 characters' }),
  talles: z
    .string()
    .array()
    .min(1, { message: 'Item must be available in at least one size' }),
  guia_de_talles: imageSchema.optional(),
  images: imageSchema
    .array()
    .max(5, { message: "Item can't have more than 5 images" }),
});

export type CreateItemSchema = z.infer<typeof createItemSchema>;

export const defaultCreateItemValues = {
  category: undefined,
  talle: [],
  description: '',
  images: [],
  name: '',
  guia_de_talles: undefined,
};
