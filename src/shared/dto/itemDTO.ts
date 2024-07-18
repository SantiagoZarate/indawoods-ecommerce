import { z } from 'zod';

export const itemSchemaDTO = z.object({
  id: z.number(),
  category: z.string(),
  description: z.string(),
  name: z.string(),
});

export type ItemDTO = z.infer<typeof itemSchemaDTO>;
