import { ChangeEvent } from 'react';

export function getImageData(event: ChangeEvent<HTMLInputElement>) {
  const file = event.target.files![0];
  const displayUrl = URL.createObjectURL(file);

  return { file, displayUrl };
}
