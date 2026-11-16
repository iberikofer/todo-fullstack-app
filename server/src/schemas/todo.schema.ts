import { z } from 'zod';

export const TodoStatusEnum = z.enum(['TODO', 'IN_PROGRESS', 'DONE']);
export type TodoStatus = z.infer<typeof TodoStatusEnum>;

export const createTodoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(200, 'Title cannot exceed 200 characters'),
  description: z.string().trim().max(1000, 'Description cannot exceed 1000 characters').optional(),
});

export const updateTodoSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, 'Title cannot be empty')
      .max(200, 'Title cannot exceed 200 characters')
      .optional(),
    description: z
      .string()
      .trim()
      .max(1000, 'Description cannot exceed 1000 characters')
      .nullable()
      .optional(),
    status: TodoStatusEnum.optional(),
  })
  .refine(
    data => data.title !== undefined || data.description !== undefined || data.status !== undefined,
    {
      message: 'At least one field (title, description, or status) must be provided to update',
    }
  );

export const todoQuerySchema = z.object({
  status: TodoStatusEnum.optional(),
  page: z.coerce.number().int().min(1, 'Page must be at least 1').default(1),
  limit: z.coerce.number().int().min(1).max(50, 'Limit cannot exceed 50').default(10),
  search: z.string().trim().optional(),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
export type TodoQueryInput = z.infer<typeof todoQuerySchema>;

