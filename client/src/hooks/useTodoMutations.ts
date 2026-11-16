import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Todo, TodoStatus } from '@/types';

export interface CreateTodoPayload {
  title: string;
  description?: string;
  isPinned?: boolean;
}

export interface UpdateTodoPayload {
  id: string;
  title?: string;
  description?: string | null;
  status?: TodoStatus;
  isPinned?: boolean;
}

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateTodoPayload) => {
      const res = await api.post<{ message: string; data: Todo }>('/todos', payload);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...payload }: UpdateTodoPayload) => {
      const res = await api.patch<{ message: string; data: Todo }>(
        `/todos/${id}`,
        payload,
      );
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete<{ message: string; id: string }>(`/todos/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
