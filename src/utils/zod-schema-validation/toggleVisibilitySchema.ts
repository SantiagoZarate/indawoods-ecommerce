import { z } from 'zod';

export const toggleVisibilitySchema = z.object({
  id: z.number(),
  visible: z.boolean(),
});
