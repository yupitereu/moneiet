'use client';
import { DefaultButton } from '@repo/ui';
import axios from 'axios';

export const TestButton = () => {
  const handleClick = () => {
    axios.get('/nest-api/hello').then((res) => {
      console.log(res.data);
    });
  };

  return (
    <DefaultButton variant="default" size="lg" onClick={handleClick}>
      Click me!
    </DefaultButton>
  );
};
