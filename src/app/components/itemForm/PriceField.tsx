import {
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormItem,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';
import { CreateItemSchema } from '../../../utils/zod-schema-validation/itemSchema';

export function PriceField() {
  const form = useFormContext<CreateItemSchema>();

  return (
    <FormField
      control={form.control}
      name='price'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Price</FormLabel>
          <FormControl>
            <Input type='number' placeholder='$ 99999' {...field} />
          </FormControl>
          <FormDescription>your item price.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
