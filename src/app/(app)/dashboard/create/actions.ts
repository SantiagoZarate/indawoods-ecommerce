'use server';

import { createServerAction } from 'zsa';
import { createItemSchemaServer } from '../../../../utils/zod-schema-validation/itemSchema';

export const createItem = createServerAction()
  .input(createItemSchemaServer)
  .handler(async ({ input }) => {
    console.log('CREANDO ITEM DESDE EL SERVER');
    console.log(input);
  });
