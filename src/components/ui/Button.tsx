'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';
import { Spinner } from './Spinner';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-semibold transition-all duration-150 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-azul-correnteza text-white hover:bg-azul-uern focus-visible:ring-azul-brilhante active:bg-azul-uern',
        danger:
          'bg-vermelho-luta text-white hover:bg-red-700 focus-visible:ring-vermelho-luta active:bg-red-800',
        secondary:
          'border-2 border-azul-correnteza text-azul-correnteza bg-transparent hover:bg-azul-claro focus-visible:ring-azul-brilhante',
        ghost:
          'text-azul-correnteza bg-transparent hover:bg-azul-claro focus-visible:ring-azul-brilhante',
        neutral:
          'bg-neutro-200 text-neutro-900 hover:bg-neutro-400 focus-visible:ring-neutro-600',
        link: 'text-azul-correnteza underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        sm: 'h-9 px-4 text-sm gap-1.5',
        md: 'h-11 px-6 text-base gap-2',
        lg: 'h-13 px-8 text-lg gap-2',
        icon: 'h-11 w-11 p-0',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, fullWidth, isLoading, leftIcon, rightIcon, children, disabled, ...props },
    ref
  ) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <Spinner size="sm" />
      ) : (
        leftIcon && <span aria-hidden="true">{leftIcon}</span>
      )}
      {children}
      {rightIcon && !isLoading && <span aria-hidden="true">{rightIcon}</span>}
    </button>
  )
);

Button.displayName = 'Button';
