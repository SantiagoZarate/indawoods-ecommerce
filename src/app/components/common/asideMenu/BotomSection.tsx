import { LogoutButton } from './LogoutButton';
import { ShopLink } from './ShopLink';

export function BotomSection() {
  return (
    <div className='flex flex-col gap-1 p-2'>
      <ShopLink />
      <LogoutButton />
    </div>
  );
}
