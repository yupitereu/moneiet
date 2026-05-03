import { Sun } from 'lucide-react';

import { Icon, type IconSize } from './Icon';

type SunIconProps = {
  className?: string;
  size?: IconSize;
};

export function SunIcon({ className, size }: SunIconProps) {
  return <Icon icon={Sun} className={className} size={size} />;
}
