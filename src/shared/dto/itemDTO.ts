import { z } from 'zod';
import { categories } from '../../constants';

export const itemSchemaDTO = z.object({
  id: z.number(),
  category: z.enum(categories),
  description: z.string(),
  name: z.string(),
  visible: z.boolean(),
  guia_de_talles: z.string().optional(),
});

export type ItemDTO = z.infer<typeof itemSchemaDTO>;
