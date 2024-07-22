import { z } from 'zod';
import { categories } from '../../constants';

const parseMoney = (moneyString: string): number => {
  return parseFloat(moneyString.replace(/[^0-9.-]+/g, ''));
};

export const itemSchemaDTO = z.object({
  id: z.number(),
  category: z.enum(categories),
  price: z
    .string()
    .refine((val) => !isNaN(parseMoney(val)), {
      message: 'Invalid money format',
    })
    .transform((val) => parseMoney(val)),
  description: z.string(),
  name: z.string(),
  visible: z.boolean(),
  guia_de_talles: z.string().optional(),
  sort_position: z.number(),
});

export const itemRecommendedSchemaDTO = itemSchemaDTO
  .pick({
    id: true,
    name: true,
  })
  .extend({
    image: z.string(),
  });

export type ItemRecommendedDTO = z.infer<typeof itemRecommendedSchemaDTO>;

export type ItemDTO = z.infer<typeof itemSchemaDTO>;
