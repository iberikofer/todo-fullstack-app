import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issues = error.issues || (error as any).errors || [];
        res.status(400).json({
          message: issues[0]?.message || 'Validation error',
          errors: issues.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
        return;
      }
      res.status(400).json({ message: 'Invalid request data' });
    }
  };
};
