'use client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  LoginSchemaType,
  loginSchema,
} from '../../../utils/zod-schema-validation/loginSchema';
import { useServerAction } from 'zsa-react';
import { login } from './actions';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: '',
    },
  });

  const { execute, isPending } = useServerAction(login, {
    onError: ({ err }) => {
      toast({ title: 'Ooops!', description: err.message });
    },
  });

  return (
    <section className='flex min-h-[100dvh] items-center justify-center'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => execute(data))}
          className='flex flex-col space-y-8'>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='joseo-infinito420' {...field} />
                </FormControl>
                <FormDescription>Get access to the management dashboard.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending}>login</Button>
        </form>
      </Form>
    </section>
  );
}
