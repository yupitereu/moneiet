import type { LucideIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '../../lib/utils';

const iconSizes = {
  xs: 'size-3',
  sm: 'size-3.5',
  md: 'size-4',
  lg: 'size-5',
  xl: 'size-6'
} as const;

type IconSize = keyof typeof iconSizes;

type IconProps = React.SVGProps<SVGSVGElement> & {
  icon: LucideIcon;
  size?: IconSize;
};

export type { IconSize };

export function Icon({ icon: IconComponent, className, size = 'md', ...props }: IconProps) {
  return <IconComponent aria-hidden focusable="false" className={cn(iconSizes[size], 'shrink-0', className)} {...props} />;
}
