'use server';

import { ZSAError, createServerAction } from 'zsa';
import { createItemSchemaServer } from '../../../../utils/zod-schema-validation/itemSchema';
import { ServiceLocator } from '../../../../service/serviceLocator';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export const createItem = createServerAction()
  .input(createItemSchemaServer)
  .handler(async ({ input }) => {
    const itemService = ServiceLocator.getService('itemService');
    console.log('CREANDO ITEM DESDE EL SERVER');
    console.log(input);

    try {
      await itemService.create(input);
    } catch (error) {
      throw new ZSAError('ERROR', error);
    }

    revalidatePath('/', 'page');
    redirect('/');
  });
