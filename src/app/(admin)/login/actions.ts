'use server';

import { AuthError } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { ZSAError, createServerAction } from 'zsa';
import { createClient } from '../../../utils/supabase/server';
import { loginSchema } from '../../../utils/zod-schema-validation/loginSchema';
import { revalidatePath } from 'next/cache';
import { envs } from '../../../config/envs';

export const login = createServerAction()
  .input(loginSchema)
  .handler(async ({ input }) => {
    const supabase = await createClient();

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: envs.VALID_EMAIL,
        password: input.password,
      });

      if (error) {
        throw new AuthError('Invalid credentials');
      }
    } catch (error) {
      if (error instanceof AuthError) {
        throw new ZSAError('NOT_AUTHORIZED', error);
      }
      throw new ZSAError('ERROR', 'There was an unexpected error');
    }

    revalidatePath('/dashboard', 'layout');
    redirect('/dashboard');
  });

export const logout = createServerAction().handler(async () => {
  const supabase = await createClient();

  try {
    await supabase.auth.signOut();
  } catch (error) {
    throw new ZSAError('ERROR', error);
  }

  redirect('/');
});
