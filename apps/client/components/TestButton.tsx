'use client';
import { Button } from '@repo/ui';

import { apiClient } from '@/lib/clients/apiClient';

export const TestButton = () => {
  const handleClick = async () => {
    const res = await apiClient.get('/users');
    console.log(res.data);
  };

  return (
    <Button variant="default" size="lg" className={''} onClick={handleClick}>
      Click me!
    </Button>
  );
};
