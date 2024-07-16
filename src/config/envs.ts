import { z } from 'zod';

const envsSchema = z.object({
  SUPABASE_URL: z.string().url(),
  SUPABASE_KEY: z.string(),
  MODE: z.enum(['development', 'production', 'test']),
});

type Envs = z.infer<typeof envsSchema>;

export const envs: Envs = envsSchema.parse({
  MODE: process.env.NODE_ENV,
  SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
} satisfies Envs);
