'use client';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { MultiSelect } from '@/components/ui/multiSelect';
import { useFormContext } from 'react-hook-form';
import { CreateItemSchema } from '../../../utils/zod-schema-validation/itemSchema';
import { Fish } from 'lucide-react';
import { TalleDTO } from '../../../shared/dto/talleDTO';

interface Props {
  talles: TalleDTO[];
}

export function SizeField({ talles }: Props) {
  const form = useFormContext<CreateItemSchema>();

  const tallesList = talles.map((talle) => ({
    value: talle.medida,
    label: talle.medida,
    icon: Fish,
  }));

  return (
    <FormField
      control={form.control}
      name='talles'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Size</FormLabel>
          <FormControl>
            <MultiSelect
              {...field}
              options={tallesList}
              onValueChange={(e) => form.setValue('talles', e)}
              defaultValue={form.watch('talles')}
              placeholder='Select frameworks'
              variant='inverted'
              animation={2}
              maxCount={3}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
