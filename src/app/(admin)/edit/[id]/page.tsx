import { ServiceLocator } from '../../../../service/serviceLocator';
import EditItemPage from './EditItem';

interface Props {
  params: {
    id: number;
  };
}

export default async function page({ params: { id } }: Props) {
  const itemService = ServiceLocator.getService('itemService');
  const item = await itemService.getOne(id);

  const talleService = ServiceLocator.getService('talleService');
  const talles = await talleService.getAll();

  return <EditItemPage item={item} talles={talles} />;
}
