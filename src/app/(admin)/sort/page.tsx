import { ServiceLocator } from '../../../service/serviceLocator';
import { SortableItemsList } from './SortableItemsList';

export default async function page() {
  const itemService = ServiceLocator.getService('itemService');
  const items = await itemService.getAll();

  return (
    <div>
      <SortableItemsList
        items={items.map((i) => ({
          id: i.id,
          name: i.name,
          sort_position: i.sort_position,
        }))}
      />
    </div>
  );
}
