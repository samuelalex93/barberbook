import { COLORS } from '../constants/colors';

interface PageHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function PageHeader({ children, className = '' }: PageHeaderProps) {
  return (
    <div
      className={`sticky top-0 z-40 border-b border-[#E5E5E5] p-4 lg:p-6 ${className}`}
      style={{ backgroundColor: COLORS.light }}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}
