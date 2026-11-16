export type TodoStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Todo {
  id: string;
  title: string;
  description?: string | null;
  status: TodoStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoListResponse {
  data: Todo[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SingleTodoResponse {
  message?: string;
  data: Todo;
}

export interface AuthResponse {
  message: string;
  user: User;
}

export interface ApiError {
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

