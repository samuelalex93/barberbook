import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { COLORS } from '../../constants/colors';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export function PasswordInput({
  label,
  error,
  fullWidth = true,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

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
        <input
          type={showPassword ? 'text' : 'password'}
          className={`
            w-full
            pl-12
            pr-12
            py-3
            rounded-xl
            focus:outline-none
            focus:ring-2
            transition-colors
            ${error ? 'border-2' : 'border'}
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
        
        {/* Lock Icon */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg
            className="w-5 h-5"
            style={{ color: COLORS.textTertiary }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm6-10V7a3 3 0 00-3-3H9a3 3 0 00-3 3v4h12V7z"
            />
          </svg>
        </div>

        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors"
          style={{
            color: COLORS.textTertiary,
          }}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>
      {error && (
        <p className="text-sm mt-1" style={{ color: '#EF4444' }}>
          {error}
        </p>
      )}
    </div>
  );
}
