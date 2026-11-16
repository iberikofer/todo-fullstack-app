'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Circle,
  Edit3,
  Trash2,
  Calendar,
  Pin,
} from 'lucide-react';
import { Todo, TodoStatus } from '@/types';
import { useUpdateTodo, useDeleteTodo } from '@/hooks/useTodoMutations';
import Badge from '@/components/ui/Badge';
import DeleteConfirmModal from '@/components/todos/DeleteConfirmModal';

export interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  style?: React.CSSProperties;
}

export default function TodoItem({ todo, onEdit, style }: TodoItemProps) {
  const { mutate: updateTodo, isPending: isUpdating } = useUpdateTodo();
  const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodo();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isPinPopping, setIsPinPopping] = useState(false);

  const nextStatusMap: Record<TodoStatus, TodoStatus> = {
    TODO: 'IN_PROGRESS',
    IN_PROGRESS: 'DONE',
    DONE: 'TODO',
  };

  const currentStatusLabel: Record<TodoStatus, string> = {
    TODO: 'To Do',
    IN_PROGRESS: 'In Progress',
    DONE: 'Done',
  };

  const handleCycleStatus = () => {
    const nextStatus = nextStatusMap[todo.status];
    updateTodo({ id: todo.id, status: nextStatus });
  };

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    setIsExiting(true);
    setTimeout(() => {
      deleteTodo(todo.id);
    }, 280);
  };

  const handleTogglePin = () => {
    setIsPinPopping(true);
    updateTodo(
      { id: todo.id, isPinned: !todo.isPinned },
      {
        onSettled: () => {
          setTimeout(() => setIsPinPopping(false), 500);
        },
      },
    );
  };

  const dateObj = new Date(todo.createdAt);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const formattedTime = dateObj.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      style={style}
      className={`group relative rounded-lg bg-white p-5 border transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 ${
        isExiting
          ? 'animate-task-swipe-right pointer-events-none'
          : isPinPopping
            ? 'animate-pin-jump ring-2 ring-[#C7A17A]/60'
            : 'animate-card-cascade'
      } ${
        todo.status === 'DONE'
          ? 'border-[#22333B]/8 border-l-4 border-l-[#5E8B7E] bg-white/70 opacity-90'
          : todo.status === 'IN_PROGRESS'
            ? 'border-[#C7A17A]/30 border-l-4 border-l-[#C7A17A] hover:border-[#C7A17A]/50 bg-linear-to-r from-[#C7A17A]/5 via-white to-white'
            : 'border-[#22333B]/10 border-l-4 border-l-[#22333B]/20 hover:border-[#22333B]/25'
      } ${todo.isPinned ? 'ring-1 ring-[#C7A17A]/30' : ''}`}
    >
      <div className="flex items-start gap-4">
        {/* Quick status toggle button with styled popup tooltip */}
        <div className="relative group/tooltip mt-0.5 shrink-0">
          <button
            type="button"
            onClick={handleCycleStatus}
            disabled={isUpdating}
            className="text-[#22333B]/40 hover:text-[#5E8B7E] transition-all duration-150 hover:scale-110 active:scale-90 cursor-pointer disabled:opacity-50 flex items-center justify-center focus:outline-none"
            aria-label={`Click to switch status (Current: ${currentStatusLabel[todo.status]})`}
          >
            {todo.status === 'DONE' ? (
              <CheckCircle2
                className="w-6 h-6 text-[#5E8B7E] fill-[#5E8B7E]/10"
                strokeWidth={2.2}
              />
            ) : todo.status === 'IN_PROGRESS' ? (
              <Clock
                className="w-6 h-6 text-[#C7A17A] animate-pulse"
                strokeWidth={2.2}
              />
            ) : (
              <Circle
                className="w-6 h-6 text-[#22333B]/40 hover:text-[#5E8B7E]"
                strokeWidth={2}
              />
            )}
          </button>

          {/* Styled Popup Tooltip */}
          <div className="pointer-events-none absolute bottom-full left-0 mb-2.5 hidden group-hover/tooltip:flex items-center gap-1.5 whitespace-nowrap rounded-md bg-[#22333B] px-2.5 py-1 text-[11px] font-medium text-white shadow-lg z-30 animate-in fade-in zoom-in-95 duration-150">
            <span>Click to switch status</span>
            <span className="text-white/40">•</span>
            <span className="text-white/80">
              Current:{' '}
              <strong className="text-white font-semibold">
                {currentStatusLabel[todo.status]}
              </strong>
            </span>
            {/* Tooltip downward arrow */}
            <div className="absolute top-full left-3 border-4 border-transparent border-t-[#22333B]" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            {todo.isPinned && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#C7A17A]/15 text-[#8A5E35] border border-[#C7A17A]/30 shadow-2xs">
                <Pin className="w-3 h-3 fill-[#C7A17A] -rotate-45" />
                <span>Pinned</span>
              </span>
            )}
            <h3
              className={`text-base font-semibold text-[#22333B] tracking-tight truncate ${
                todo.status === 'DONE' ? 'line-through text-[#22333B]/50' : ''
              }`}
            >
              {todo.title}
            </h3>
            <Badge status={todo.status} size="sm" />
          </div>

          {todo.description && (
            <p
              className={`text-sm text-[#22333B]/70 whitespace-pre-wrap leading-relaxed ${
                todo.status === 'DONE' ? 'text-[#22333B]/40' : ''
              }`}
            >
              {todo.description}
            </p>
          )}

          <div className="flex items-center gap-4 mt-3 text-xs text-[#22333B]/50 font-medium">
            <span className="flex items-center gap-1.5" suppressHydrationWarning>
              <Calendar className="w-3.5 h-3.5" />
              <span>{formattedDate}</span>
              <span className="text-[#22333B]/30">•</span>
              <span>{formattedTime}</span>
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={handleTogglePin}
            disabled={isUpdating}
            className={`p-2 rounded-lg transition-all duration-150 hover:scale-110 active:scale-90 cursor-pointer ${
              todo.isPinned
                ? 'text-[#C7A17A] bg-[#C7A17A]/15 hover:bg-[#C7A17A]/25 shadow-2xs'
                : 'text-[#22333B]/40 hover:text-[#C7A17A] hover:bg-[#C7A17A]/10'
            }`}
            title={todo.isPinned ? 'Unpin task' : 'Pin task to top'}
            aria-label={todo.isPinned ? 'Unpin task' : 'Pin task to top'}
          >
            <Pin
              className={`w-4 h-4 transition-transform duration-150 ${
                todo.isPinned ? 'fill-[#C7A17A] -rotate-45' : ''
              }`}
            />
          </button>

          <button
            type="button"
            onClick={() => onEdit(todo)}
            className="p-2 rounded-lg text-[#22333B]/60 hover:text-[#22333B] hover:bg-[#22333B]/5 transition-all duration-150 hover:scale-110 active:scale-90 cursor-pointer"
            title="Edit task"
            aria-label="Edit task"
          >
            <Edit3 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className="p-2 rounded-lg text-[#22333B]/60 hover:text-rose-600 hover:bg-rose-50 transition-all duration-150 hover:scale-110 active:scale-90 cursor-pointer"
            title="Delete task"
            aria-label="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal with Soft Blur */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={todo.title}
        isDeleting={isDeleting}
      />
    </div>
  );
}
