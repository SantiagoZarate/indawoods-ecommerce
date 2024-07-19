import { CreateItemForm } from '@/components/itemForm/CreateItem';
import { ServiceLocator } from '../../../service/serviceLocator';

export default async function Page() {
  const talleService = ServiceLocator.getService('talleService');
  const talles = await talleService.getAll();

  return <CreateItemForm talles={talles} />;
}
