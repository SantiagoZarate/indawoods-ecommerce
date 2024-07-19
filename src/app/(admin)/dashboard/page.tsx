import { PreviewImage } from '@/components/ui/previewImage';
import { ServiceLocator } from '../../../service/serviceLocator';

export default async function DashboardPage() {
  const itemService = ServiceLocator.getService('itemService');
  const items = await itemService.getAll();

  return (
    <section>
      <ul className='flex flex-col divide-y'>
        {items.map((item) => (
          <li key={item.id} className='flex items-center justify-between p-4'>
            <PreviewImage src={item.imagen[0].url} />
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
