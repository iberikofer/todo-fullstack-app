import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { User, AuthResponse } from '@/types';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const useCurrentUser = () => {
  return useQuery<User | null>({
    queryKey: ['me'],
    queryFn: async () => {
      try {
        const res = await api.get<{ user: User }>('/auth/me');
        return res.data.user;
      } catch {
        return null;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const res = await api.post<AuthResponse>('/auth/login', payload);
      return res.data;
    },
    onSuccess: data => {
      queryClient.setQueryData(['me'], data.user);
      router.push('/todos');
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const res = await api.post<AuthResponse>('/auth/register', payload);
      return res.data;
    },
    onSuccess: data => {
      queryClient.setQueryData(['me'], data.user);
      router.push('/todos');
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const res = await api.post<{ message: string }>('/auth/logout');
      return res.data;
    },
    onSuccess: () => {
      queryClient.setQueryData(['me'], null);
      queryClient.removeQueries({ queryKey: ['todos'] });
      router.push('/login');
    },
  });
};
