import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';
import { CreateItemSchema } from '../../../utils/zod-schema-validation/itemSchema';

export function DescriptionField() {
  const form = useFormContext<CreateItemSchema>();

  return (
    <FormField
      control={form.control}
      name='description'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Input placeholder='new t-shirt' {...field} />
          </FormControl>
          <FormDescription>item description.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
