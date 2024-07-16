import { z } from 'zod';

export const imageSchemaDTO = z.object({
  id: z.coerce.number(),
  sort_position: z.coerce.number(),
  url: z.string(),
  created_at: z.string(),
});

export type ImageDTO = z.infer<typeof imageSchemaDTO>;
