import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'destructive';
type ButtonSize = 'small' | 'large';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'large',
  fullWidth = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'rounded-full font-bold transition-colors',
        {
          // Variants
          'bg-main-purple text-white hover:bg-main-purple/80': variant === 'primary',
          'bg-purple-600/10 text-purple-600 hover:bg-purple-600/25': variant === 'secondary',
          'bg-red-500 text-white hover:bg-red-400': variant === 'destructive',
          
          // Sizes
          'h-8 px-4 text-sm': size === 'small',
          'h-12 px-6 text-base': size === 'large',
          
          // Width
          'w-full': fullWidth,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};