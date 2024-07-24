import Image from 'next/image';

export function AsideHeader() {
  return (
    <header className='flex items-center gap-2 border-b p-4'>
      <div className='relative aspect-square size-12 overflow-hidden rounded-lg'>
        <Image fill={true} alt='indawoods logo' src={'/images/indawoods-logo.jpg'} />
      </div>
      <div className='hidden flex-col gap-1 md:flex'>
        <span className='text-2xl'>indawoods</span>
        <span className='font-mono text-xs uppercase'>dashboard</span>
      </div>
    </header>
  );
}
