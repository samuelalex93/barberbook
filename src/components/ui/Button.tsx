import React from 'react';
import { COLORS } from '../../constants/colors';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'danger-outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantStyles = {
    primary: {
      bg: COLORS.accent,
      bgHover: COLORS.accentDark,
      text: 'text-white',
    },
    secondary: {
      bg: '#ABABAB',
      bgHover: '#9CA3AF',
      text: `text-white`,
    },
    tertiary: {
      bg: 'transparent',
      bgHover: COLORS.light,
      text: `text-[${COLORS.accent}]`,
      border: `border border-[${COLORS.accent}]`,
    },
    danger: {
      bg: '#EF4444',
      bgHover: '#DC2626',
      text: 'text-white',
    },
    'danger-outline': {
      bg: 'transparent',
      bgHover: '#FEE2E2',
      text: 'text-red-500',
      border: 'border border-red-500',
    },
  };

  const variant_ = variantStyles[variant];

  return (
    <button
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variant_.text}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      style={{
        backgroundColor: variant_.bg,
        ...(variant === 'tertiary' && { borderColor: COLORS.accent, borderWidth: '1px' }),
        ...((variant === 'danger-outline') && { borderColor: '#EF4444', borderWidth: '1px' }),
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = variant_.bgHover;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = variant_.bg;
      }}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? '...' : children}
    </button>
  );
}
