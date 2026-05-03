import { Moon } from 'lucide-react';

import { Icon, type IconSize } from './Icon';

type MoonIconProps = {
  className?: string;
  size?: IconSize;
};

export function MoonIcon({ className, size }: MoonIconProps) {
  return <Icon icon={Moon} className={className} size={size} />;
}
