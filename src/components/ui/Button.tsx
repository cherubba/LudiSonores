import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

const base =
  'inline-flex items-center gap-3 px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer border';

const variants: Record<Variant, string> = {
  primary: 'border-gold text-fg hover:bg-gold hover:text-bg',
  ghost: 'border-line text-fg-muted hover:border-fg hover:text-fg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className, children, ...props }, ref) => (
    <button ref={ref} className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  ),
);
Button.displayName = 'Button';
