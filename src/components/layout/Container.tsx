import type { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Container({ className, children, ...rest }: Props) {
  return (
    <div className={cn('mx-auto w-full max-w-[1280px] px-6 md:px-12', className)} {...rest}>
      {children}
    </div>
  );
}
