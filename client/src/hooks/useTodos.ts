import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { TodoListResponse, TodoStatus } from '@/types';

export interface UseTodosOptions {
  status?: TodoStatus | 'ALL';
  page?: number;
  limit?: number;
  search?: string;
}

export const useTodos = ({
  status,
  page = 1,
  limit = 10,
  search = '',
}: UseTodosOptions = {}) => {
  const queryStatus = status && status !== 'ALL' ? status : undefined;
  const trimmedSearch = search.trim() || undefined;

  return useQuery<TodoListResponse>({
    queryKey: ['todos', { status: queryStatus, page, limit, search: trimmedSearch }],
    queryFn: async () => {
      const res = await api.get<TodoListResponse>('/todos', {
        params: {
          status: queryStatus,
          page,
          limit,
          search: trimmedSearch,
        },
      });
      return res.data;
    },
    staleTime: 30 * 1000,
  });
};
