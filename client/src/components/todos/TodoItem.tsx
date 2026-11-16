'use client';

import React, { useState } from 'react';
import { CheckCircle2, Clock, Circle, Edit3, Trash2, Calendar } from 'lucide-react';
import { Todo, TodoStatus } from '@/types';
import { useUpdateTodo, useDeleteTodo } from '@/hooks/useTodoMutations';
import Badge from '@/components/ui/Badge';

export interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
}

export default function TodoItem({ todo, onEdit }: TodoItemProps) {
  const { mutate: updateTodo, isPending: isUpdating } = useUpdateTodo();
  const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodo();
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const nextStatusMap: Record<TodoStatus, TodoStatus> = {
    TODO: 'IN_PROGRESS',
    IN_PROGRESS: 'DONE',
    DONE: 'TODO',
  };

  const handleCycleStatus = () => {
    const nextStatus = nextStatusMap[todo.status];
    updateTodo({ id: todo.id, status: nextStatus });
  };

  const handleDelete = () => {
    if (isConfirmingDelete) {
      deleteTodo(todo.id);
    } else {
      setIsConfirmingDelete(true);
    }
  };

  const formattedDate = new Date(todo.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      className={`group relative rounded-2xl bg-white p-5 border transition-all duration-150 shadow-xs hover:shadow-sm ${
        todo.status === 'DONE'
          ? 'border-[#22333B]/8 bg-white/70 opacity-90'
          : 'border-[#22333B]/10 hover:border-[#22333B]/20'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Quick status toggle button */}
        <button
          type="button"
          onClick={handleCycleStatus}
          disabled={isUpdating}
          title={`Click to switch status (Current: ${todo.status})`}
          className="mt-0.5 shrink-0 text-[#22333B]/40 hover:text-[#5E8B7E] transition-colors cursor-pointer disabled:opacity-50"
          aria-label="Cycle task status"
        >
          {todo.status === 'DONE' ? (
            <CheckCircle2 className="w-5 h-5 text-[#5E8B7E] fill-[#5E8B7E]/10" />
          ) : todo.status === 'IN_PROGRESS' ? (
            <Clock className="w-5 h-5 text-[#C7A17A] animate-pulse" />
          ) : (
            <Circle className="w-5 h-5 hover:stroke-[#5E8B7E]" />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
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
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formattedDate}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => onEdit(todo)}
            className="p-2 rounded-lg text-[#22333B]/60 hover:text-[#22333B] hover:bg-[#22333B]/5 transition-colors cursor-pointer"
            title="Edit task"
            aria-label="Edit task"
          >
            <Edit3 className="w-4 h-4" />
          </button>

          {isConfirmingDelete ? (
            <div className="flex items-center gap-1 bg-rose-50 px-2 py-1 rounded-lg border border-rose-200">
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-xs font-semibold text-rose-700 hover:text-rose-800 cursor-pointer"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => setIsConfirmingDelete(false)}
                className="text-xs text-[#22333B]/60 hover:text-[#22333B] ml-1 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleDelete}
              className="p-2 rounded-lg text-[#22333B]/60 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              title="Delete task"
              aria-label="Delete task"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
