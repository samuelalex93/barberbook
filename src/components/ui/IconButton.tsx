import React from 'react';
import { COLORS } from '../../constants/colors';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  className = '',
  ...props
}: IconButtonProps) {
  const sizeStyles = {
    sm: 'w-8 h-8 p-1.5',
    md: 'w-10 h-10 p-2',
    lg: 'w-12 h-12 p-2.5',
  };

  const variantStyles = {
    primary: {
      default: COLORS.accent,
      hover: COLORS.accentDark,
      text: 'text-white',
    },
    secondary: {
      default: '#ABABAB',
      hover: '#9CA3AF',
      text: `text-white`,
    },
    ghost: {
      default: 'transparent',
      hover: COLORS.light,
      text: `text-[${COLORS.text}]`,
    },
  };

  const variant_ = variantStyles[variant];

  return (
    <button
      className={`
        flex
        items-center
        justify-center
        rounded-lg
        transition-colors
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${sizeStyles[size]}
        ${variant_.text}
        ${className}
      `}
      style={{
        backgroundColor: variant_.default,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = variant_.hover;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = variant_.default;
      }}
      {...props}
    >
      {icon}
    </button>
  );
}
