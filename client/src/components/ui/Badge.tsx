import React from 'react';
import { TodoStatus } from '@/types';

export interface BadgeProps {
  status: TodoStatus;
  size?: 'sm' | 'md';
  className?: string;
}

const statusConfig: Record<
  TodoStatus,
  { label: string; dotColor: string; containerStyles: string }
> = {
  TODO: {
    label: 'To Do',
    dotColor: 'bg-[#22333B]',
    containerStyles: 'bg-[#22333B]/8 text-[#22333B] border-[#22333B]/15',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    dotColor: 'bg-[#C7A17A]',
    containerStyles: 'bg-[#C7A17A]/15 text-[#8A5E35] border-[#C7A17A]/30',
  },
  DONE: {
    label: 'Done',
    dotColor: 'bg-[#5E8B7E]',
    containerStyles: 'bg-[#5E8B7E]/15 text-[#3B6055] border-[#5E8B7E]/30',
  },
};

export const Badge: React.FC<BadgeProps> = ({
  status,
  size = 'md',
  className = '',
}) => {
  const config = statusConfig[status] || statusConfig.TODO;

  const sizeClasses =
    size === 'sm' ? 'text-[11px] px-2 py-0.5 gap-1.5' : 'text-xs px-2.5 py-1 gap-2';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border tracking-wide select-none ${sizeClasses} ${config.containerStyles} ${className}`}
    >
      <span
        className={`w-2 h-2 rounded-full ${config.dotColor}`}
        aria-hidden="true"
      />
      {config.label}
    </span>
  );
};

export default Badge;
