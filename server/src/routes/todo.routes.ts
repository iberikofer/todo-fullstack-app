import { Router } from 'express';
import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/todo.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validate.middleware';
import {
  createTodoSchema,
  updateTodoSchema,
  todoQuerySchema,
} from '../schemas/todo.schema';

const router = Router();

// All Todo routes require authentication
router.use(authenticate);

router.get('/', getTodos);
router.get('/:id', getTodoById);
router.post('/', validateBody(createTodoSchema), createTodo);
router.patch('/:id', validateBody(updateTodoSchema), updateTodo);
router.delete('/:id', deleteTodo);

export default router;
