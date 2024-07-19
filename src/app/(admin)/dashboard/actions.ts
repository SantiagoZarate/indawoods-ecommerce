'use server';

import { revalidatePath } from 'next/cache';
import { ZSAError, createServerAction } from 'zsa';
import { ServiceLocator } from '../../../service/serviceLocator';
import { toggleVisibilitySchema } from '../../../utils/zod-schema-validation/toggleVisibilitySchema';
import { redirect } from 'next/navigation';

export const toggleVisibility = createServerAction()
  .input(toggleVisibilitySchema)
  .handler(async ({ input }) => {
    const itemService = ServiceLocator.getService('itemService');

    try {
      await itemService.toggleVisibility(input);
    } catch (error) {
      throw new ZSAError('ERROR', error);
    }

    revalidatePath('/dashboard', 'page');
    redirect('/dashboard');
  });
