import React from 'react';
import { COLORS } from '../../constants/colors';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export function Input({
  icon,
  label,
  error,
  fullWidth = true,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label
          className="block text-sm font-semibold mb-2"
          style={{ color: COLORS.text }}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full
            ${icon ? 'pl-12' : 'pl-4'}
            pr-4
            py-3
            rounded-xl
            focus:outline-none
            focus:ring-2
            transition-colors
            ${error ? 'border-2' : 'border'}
            ${className}
          `}
          style={{
            backgroundColor: COLORS.light,
            borderColor: error ? '#EF4444' : COLORS.mid,
            '--tw-ring-color': `rgba(249, 115, 22, 0.1)`,
          } as React.CSSProperties}
          onFocus={(e) => {
            if (!error) {
              (e.target as HTMLInputElement).style.borderColor = COLORS.accent;
            }
          }}
          onBlur={(e) => {
            if (!error) {
              (e.target as HTMLInputElement).style.borderColor = COLORS.mid;
            }
          }}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm mt-1" style={{ color: '#EF4444' }}>
          {error}
        </p>
      )}
    </div>
  );
}
