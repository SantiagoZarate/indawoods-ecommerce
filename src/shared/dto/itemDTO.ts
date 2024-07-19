import { z } from 'zod';

export const itemSchemaDTO = z.object({
  id: z.number(),
  category: z.string(),
  description: z.string(),
  name: z.string(),
  visible: z.boolean(),
});

export type ItemDTO = z.infer<typeof itemSchemaDTO>;
