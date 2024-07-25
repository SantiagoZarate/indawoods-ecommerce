import { useFormContext } from 'react-hook-form';
import { TalleDTO } from '../../../shared/dto/talleDTO';
import { CreateItemSchema } from '../../../utils/zod-schema-validation/itemSchema';
import { Button } from '../ui/button';
import { CategoryField } from './CategoryField';
import { DescriptionField } from './DescriptionField';
import { GuiaDeTallesField } from './GuiaDeTallesField';
import { ImagesField } from './ImagesField';
import { NameField } from './NameField';
import { PriceField } from './PriceField';
import { SizeField } from './SizeField';

interface Props {
  talles: TalleDTO[];
  onSubmit: (data: CreateItemSchema) => void;
  isPending: boolean;
}

export function Form({ onSubmit, talles, isPending }: Props) {
  const form = useFormContext<CreateItemSchema>();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-cols-2 gap-6'>
      <section className='col-span-2 flex flex-col gap-4 border border-border bg-background p-4 lg:col-span-1'>
        <NameField />
        <DescriptionField />
        <PriceField />
        <CategoryField />
        <SizeField talles={talles} />
      </section>
      <section className='col-span-2 flex flex-col gap-4 border border-border bg-background p-4 lg:col-span-1'>
        <GuiaDeTallesField />
        <ImagesField />
      </section>
      <footer className='col-span-2 flex items-center justify-between border border-border bg-background p-4'>
        <p>Create new item</p>
        <Button disabled={isPending} type='submit'>
          Save
        </Button>
      </footer>
    </form>
  );
}
