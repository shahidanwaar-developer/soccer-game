

interface StatusBadgeProps {
  status: 'upcoming' | 'live' | 'completed' | 'pending' | 'accepted' | 'rejected';
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const statusConfig: Record<'upcoming' | 'live' | 'completed' | 'pending' | 'accepted' | 'rejected', { bg: string; text: string; label: string; pulse?: boolean }> = {
    upcoming: { bg: 'bg-blue-900', text: 'text-blue-200', label: 'Upcoming' },
    live: { bg: 'bg-red-900', text: 'text-red-200', label: 'Live', pulse: true },
    completed: { bg: 'bg-gray-700', text: 'text-gray-200', label: 'Completed' },
    pending: { bg: 'bg-yellow-900', text: 'text-yellow-200', label: 'Pending' },
    accepted: { bg: 'bg-green-900', text: 'text-green-200', label: 'Accepted' },
    rejected: { bg: 'bg-red-900', text: 'text-red-200', label: 'Rejected' },
  };

  const config = statusConfig[status];
  const sizeClass = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full ${config.bg} ${config.text} ${sizeClass} ${
        config.pulse ? 'animate-pulse' : ''
      }`}
    >
      {config.pulse && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
      {config.label}
    </span>
  );
}

interface RatingBadgeProps {
  rating: number;
  change?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function RatingBadge({ rating, change, size = 'md' }: RatingBadgeProps) {
  const sizeClass = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }[size];

  return (
    <div className={`${sizeClass} font-bold`}>
      <p className="text-gray-300">Rating</p>
      <p className="text-2xl text-white">{rating}</p>
      {change !== undefined && (
        <p className={`text-sm ${change > 0 ? 'text-green-400' : change < 0 ? 'text-red-400' : 'text-gray-400'}`}>
          {change > 0 ? '+' : ''}{change}
        </p>
      )}
    </div>
  );
}
