import { Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth.middleware';
import {
  CreateTodoInput,
  UpdateTodoInput,
  todoQuerySchema,
} from '../schemas/todo.schema';

export const getTodos = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId!;
    const queryResult = todoQuerySchema.safeParse(req.query);

    if (!queryResult.success) {
      res.status(400).json({
        message: 'Invalid query parameters',
        errors: queryResult.error.issues.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
      return;
    }

    const { status, page, limit, search } = queryResult.data;
    const skip = (page - 1) * limit;

    const where: any = {
      userId,
      ...(status && { status }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [todos, total] = await prisma.$transaction([
      prisma.todo.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.todo.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    res.status(200).json({
      data: todos,
      total,
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    console.error('Error in getTodos:', error);
    res.status(500).json({ message: 'Internal server error fetching tasks' });
  }
};

export const getTodoById = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.userId!;
    const id = String(req.params.id);

    const todo = await prisma.todo.findFirst({
      where: { id, userId },
    });

    if (!todo) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.status(200).json({ data: todo });
  } catch (error) {
    console.error('Error in getTodoById:', error);
    res.status(500).json({ message: 'Internal server error fetching task' });
  }
};

export const createTodo = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId!;
    const { title, description } = req.body as CreateTodoInput;

    const todo = await prisma.todo.create({
      data: {
        title,
        description: description?.trim() ? description.trim() : null,
        userId,
      },
    });

    res.status(201).json({
      message: 'Task created successfully',
      data: todo,
    });
  } catch (error) {
    console.error('Error in createTodo:', error);
    res.status(500).json({ message: 'Internal server error creating task' });
  }
};

export const updateTodo = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId!;
    const id = String(req.params.id);
    const { title, description, status } = req.body as UpdateTodoInput;

    const existingTodo = await prisma.todo.findFirst({
      where: { id, userId },
    });

    if (!existingTodo) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && {
          description: description?.trim() ? description.trim() : null,
        }),
        ...(status !== undefined && { status }),
      },
    });

    res.status(200).json({
      message: 'Task updated successfully',
      data: updatedTodo,
    });
  } catch (error) {
    console.error('Error in updateTodo:', error);
    res.status(500).json({ message: 'Internal server error updating task' });
  }
};

export const deleteTodo = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId!;
    const id = String(req.params.id);

    const existingTodo = await prisma.todo.findFirst({
      where: { id, userId },
    });

    if (!existingTodo) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    await prisma.todo.delete({
      where: { id },
    });

    res.status(200).json({
      message: 'Task deleted successfully',
      id,
    });
  } catch (error) {
    console.error('Error in deleteTodo:', error);
    res.status(500).json({ message: 'Internal server error deleting task' });
  }
};
