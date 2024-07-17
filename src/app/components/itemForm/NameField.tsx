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

export function NameField() {
  const form = useFormContext<CreateItemSchema>();

  return (
    <FormField
      control={form.control}
      name='name'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input placeholder='new t-shirt' {...field} />
          </FormControl>
          <FormDescription>your new item name.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
