'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Plus } from 'lucide-react';
import { Todo } from '@/types';
import TodoItem from '@/components/todos/TodoItem';
import Button from '@/components/ui/Button';

export interface TodoListProps {
  todos?: Todo[];
  isLoading: boolean;
  total?: number;
  page: number;
  totalPages?: number;
  onPageChange: (newPage: number) => void;
  onEdit: (todo: Todo) => void;
  onAddNew: () => void;
  currentFilterLabel?: string;
}

export default function TodoList({
  todos = [],
  isLoading,
  total = 0,
  page,
  totalPages = 1,
  onPageChange,
  onEdit,
  onAddNew,
  currentFilterLabel,
}: TodoListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4].map(idx => (
          <div
            key={idx}
            className="rounded-lg bg-white p-5 border border-[#22333B]/8 animate-pulse flex items-start gap-4"
          >
            <div className="w-5 h-5 rounded-full bg-[#22333B]/10 shrink-0 mt-0.5" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-[#22333B]/10 rounded-md w-1/3" />
              <div className="h-3 bg-[#22333B]/8 rounded-md w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (todos.length === 0) {
    const getEmptyMessage = () => {
      if (currentFilterLabel === 'Completed') {
        return 'No completed tasks yet. Complete a task to see it here!';
      }
      if (currentFilterLabel === 'In Progress') {
        return 'No tasks currently in progress. Start working on a task from your queue.';
      }
      if (currentFilterLabel === 'To Do') {
        return 'No pending tasks in your To Do queue. Create one below to get started.';
      }
      return 'You are all caught up! Create your first task to start organizing.';
    };

    return (
      <div className="rounded-lg bg-white border border-[#22333B]/10 p-12 text-center shadow-xs">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-md bg-[#5E8B7E]/10 text-[#5E8B7E] mb-4">
          <CheckCircle className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-[#22333B] tracking-tight">
          No tasks found
        </h3>
        <p className="text-sm text-[#22333B]/70 max-w-sm mx-auto mt-1.5 mb-6">
          {getEmptyMessage()}
        </p>
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={onAddNew}
          className="mx-auto"
        >
          <Plus className="w-4 h-4" />
          Create New Task
        </Button>
      </div>
    );
  }

  const startRange = (page - 1) * 10 + 1;
  const endRange = Math.min(page * 10, total);

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {todos.map((todo, idx) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={onEdit}
            style={{ animationDelay: `${Math.min(idx * 65, 390)}ms` }}
          />
        ))}
      </div>

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#22333B]/8 text-xs text-[#22333B]/70">
          <p>
            Showing{' '}
            <span className="font-semibold text-[#22333B]">
              {startRange}–{endRange}
            </span>{' '}
            of <span className="font-semibold text-[#22333B]">{total}</span> tasks
          </p>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              className="px-2.5 py-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Previous
            </Button>

            <span className="px-3 py-1 font-medium text-[#22333B]">
              Page {page} of {totalPages}
            </span>

            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              className="px-2.5 py-1"
            >
              Next
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
