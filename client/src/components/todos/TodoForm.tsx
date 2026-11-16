'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Todo, TodoStatus } from '@/types';
import { useCreateTodo, useUpdateTodo } from '@/hooks/useTodoMutations';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const todoFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(200, 'Title cannot exceed 200 characters'),
  description: z
    .string()
    .trim()
    .max(1000, 'Description cannot exceed 1000 characters')
    .optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']),
});

type TodoFormData = z.infer<typeof todoFormSchema>;

export interface TodoFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  todoToEdit?: Todo | null;
}

export default function TodoFormModal({
  isOpen,
  onClose,
  todoToEdit,
}: TodoFormModalProps) {
  const isEditing = !!todoToEdit;
  const { mutate: createTodo, isPending: isCreating } = useCreateTodo();
  const { mutate: updateTodo, isPending: isUpdating } = useUpdateTodo();
  const isPending = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'TODO',
    },
  });

  useEffect(() => {
    if (todoToEdit) {
      reset({
        title: todoToEdit.title,
        description: todoToEdit.description || '',
        status: todoToEdit.status,
      });
    } else {
      reset({
        title: '',
        description: '',
        status: 'TODO',
      });
    }
  }, [todoToEdit, reset, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const onSubmit = (data: TodoFormData) => {
    if (isEditing && todoToEdit) {
      updateTodo(
        {
          id: todoToEdit.id,
          title: data.title,
          description: data.description || null,
          status: data.status as TodoStatus,
        },
        {
          onSuccess: () => {
            onClose();
            reset();
          },
        },
      );
    } else {
      createTodo(
        {
          title: data.title,
          description: data.description || undefined,
        },
        {
          onSuccess: () => {
            onClose();
            reset();
          },
        },
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#22333B]/40 backdrop-blur-xs transition-opacity animate-in fade-in"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 sm:p-7 shadow-lg border border-[#22333B]/10 text-[#22333B] relative animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-[#22333B]/8 mb-5">
          <h2 className="text-xl font-bold tracking-tight text-[#22333B]">
            {isEditing ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#22333B]/60 hover:text-[#22333B] hover:bg-[#22333B]/5 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Task Title"
            placeholder="e.g. Design user interface layout"
            error={errors.title?.message}
            autoFocus
            {...register('title')}
          />

          <div className="flex flex-col gap-1.5 text-left">
            <label
              htmlFor="description"
              className="text-xs font-semibold text-[#22333B]/85 tracking-wide uppercase"
            >
              Description (Optional)
            </label>
            <textarea
              id="description"
              rows={3}
              placeholder="Add key notes, context, or checklist details..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white text-[#22333B] placeholder:text-[#22333B]/35 border border-[#22333B]/15 hover:border-[#22333B]/30 focus:border-[#5E8B7E] focus:ring-2 focus:ring-[#5E8B7E]/20 text-sm transition-all duration-150 outline-none resize-none"
              {...register('description')}
            />
            {errors.description && (
              <p className="text-xs text-rose-600 font-medium mt-0.5">
                {errors.description.message}
              </p>
            )}
          </div>

          {isEditing && (
            <div className="flex flex-col gap-1.5 text-left">
              <label
                htmlFor="status"
                className="text-xs font-semibold text-[#22333B]/85 tracking-wide uppercase"
              >
                Status
              </label>
              <select
                id="status"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white text-[#22333B] border border-[#22333B]/15 hover:border-[#22333B]/30 focus:border-[#5E8B7E] focus:ring-2 focus:ring-[#5E8B7E]/20 text-sm transition-all duration-150 outline-none cursor-pointer"
                {...register('status')}
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#22333B]/8 mt-6">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md" isLoading={isPending}>
              {isEditing ? 'Save Changes' : 'Create Task'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
