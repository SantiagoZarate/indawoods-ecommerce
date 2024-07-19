import { z } from 'zod';

const envsSchema = z.object({
  MODE: z.enum(['development', 'production', 'test']),
  SUPABASE_URL: z.string().url(),
  SUPABASE_KEY: z.string(),
  VALID_EMAIL: z.string().email(),
});

type Envs = z.infer<typeof envsSchema>;

export const envs = envsSchema.parse({
  MODE: process.env.NODE_ENV,
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  VALID_EMAIL: process.env.NEXT_VALID_EMAIL!,
} satisfies Envs);
