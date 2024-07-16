import { z } from 'zod';
import { ImageRaw } from '../../types/supabase';

export const imageSchemaDTO = z.object({
  id: z.coerce.number(),
  sort_position: z.coerce.number(),
  url: z.string(),
  created_at: z.string(),
  item_id: z.coerce.number(),
}) satisfies z.ZodType<ImageRaw>;

export type ImageDTO = z.infer<typeof imageSchemaDTO>;
