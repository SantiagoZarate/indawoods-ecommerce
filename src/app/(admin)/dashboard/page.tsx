import { PreviewImage } from '@/components/ui/previewImage';
import { ServiceLocator } from '../../../service/serviceLocator';
import { ToggleVisibilityButton } from './ToggleVisibilityButton';
import Link from 'next/link';

export default async function DashboardPage() {
  const itemService = ServiceLocator.getService('itemService');
  const items = await itemService.getAll();

  return (
    <section className=''>
      <table className='w-full rounded-md border border-border text-left text-sm text-gray-500 shadow-md dark:text-gray-400 rtl:text-right'>
        <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Product Image
            </th>
            <th scope='col' className='px-6 py-3'>
              Product Name
            </th>
            <th scope='col' className='px-6 py-3'>
              Price
            </th>
            <th scope='col' className='px-6 py-3'>
              Visibility
            </th>
            <th scope='col' className='px-6 py-3'>
              <span className='sr-only'>Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className='bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600'>
              <td className='px-6 py-4'>
                <PreviewImage src={item.imagen[0].url} />
              </td>
              <td className='px-6 py-4'>{item.name}</td>
              <td className='px-6 py-4'>$9499.99</td>
              <td className='px-6 py-4'>
                <ToggleVisibilityButton id={item.id} visible={item.visible} />
              </td>
              <td className='px-6 py-4 text-right'>
                <Link
                  className='font-medium text-blue-600 hover:underline dark:text-blue-500'
                  href={`/edit/${item.id}`}>
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
