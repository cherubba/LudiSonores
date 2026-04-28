import type { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface LabelProps {
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}

export function Field({ label, required, hint, children }: LabelProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs tracking-[0.2em] text-fg-muted uppercase">
        {label} {required && <span className="text-gold">*</span>}
      </span>
      {children}
      {hint && <span className="mt-1.5 block text-xs text-fg-muted">{hint}</span>}
    </label>
  );
}

export function TextInput({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...rest}
      className={cn(
        'w-full border border-line bg-bg-soft px-4 py-3 font-sans text-sm text-fg outline-none transition-colors focus:border-gold',
        className,
      )}
    />
  );
}

export function TextArea({ className, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...rest}
      className={cn(
        'w-full resize-none border border-line bg-bg-soft px-4 py-3 font-sans text-sm text-fg outline-none transition-colors focus:border-gold',
        className,
      )}
    />
  );
}

interface SwitchProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint?: string;
}

export function Switch({ checked, onChange, label, hint }: SwitchProps) {
  return (
    <label className="flex cursor-pointer items-start gap-4">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative mt-1 h-6 w-11 shrink-0 border transition-colors',
          checked ? 'border-gold bg-gold/20' : 'border-line bg-bg-soft',
        )}
      >
        <span
          className={cn(
            'absolute top-1/2 left-0.5 h-4 w-4 -translate-y-1/2 transition-all',
            checked ? 'translate-x-5 bg-gold' : 'translate-x-0 bg-fg-muted',
          )}
        />
      </button>
      <span className="flex-1">
        <span className="block text-sm text-fg">{label}</span>
        {hint && <span className="mt-0.5 block text-xs text-fg-muted">{hint}</span>}
      </span>
    </label>
  );
}
