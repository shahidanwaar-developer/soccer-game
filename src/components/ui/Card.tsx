import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
}

export function Card({ children, hoverable = false, className = '', ...props }: CardProps) {
  return (
    <div
      className={`bg-gray-800 rounded-xl border border-gray-700 shadow-lg p-6 ${
        hoverable ? 'hover:border-gray-600 hover:shadow-xl transition-all duration-200 cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: {
    value: number | string;
    type: 'positive' | 'negative' | 'neutral';
  };
  onClick?: () => void;
}

export function StatCard({ label, value, icon, change, onClick }: StatCardProps) {
  return (
    <Card
      hoverable={!!onClick}
      onClick={onClick}
      className="flex items-start justify-between"
    >
      <div>
        <p className="text-sm text-gray-400 mb-1">{label}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
        {change && (
          <p
            className={`text-sm mt-2 ${
              change.type === 'positive'
                ? 'text-green-400'
                : change.type === 'negative'
                  ? 'text-red-400'
                  : 'text-gray-400'
            }`}
          >
            {change.type === 'positive' ? '+' : change.type === 'negative' ? '-' : ''}
            {change.value}
          </p>
        )}
      </div>
      {icon && <div className="text-3xl">{icon}</div>}
    </Card>
  );
}
