'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { ExclamationIcon } from './icons/ExclamationIcon';
import { XMicroIcon } from './icons/XMicroIcon';

function Disclaimer() {
  const [show, setShow] = useState(
    window.localStorage.getItem('dontShowDisclaimer') === null,
  );

  const onCloseDisclaimer = () => {
    localStorage.setItem('dontShowDisclaimer', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className='fixed bottom-0 left-0 z-50 m-4 flex max-w-[300px] flex-col gap-2 rounded-md border border-border bg-background p-4'>
      <header className='flex items-center justify-between gap-2'>
        <div className='flex items-center gap-2'>
          <ExclamationIcon />
          <p className='font-bold'>Disclaimer</p>
        </div>
        <button className='hoverable' onClick={() => onCloseDisclaimer()}>
          <XMicroIcon />
        </button>
      </header>
      <p className='text-xs'>
        This is not an official website, it was made for educational purposes
      </p>
    </div>
  );
}

export const DinamicDisclaimer = dynamic(async () => Disclaimer, {
  ssr: false,
});
