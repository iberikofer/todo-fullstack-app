import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: string;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ message: 'Unauthorized. Please log in.' });
    return;
  }

  const secret = process.env.JWT_SECRET || 'super-secret-jwt-key-todo-app-dev';

  try {
    const decoded = jwt.verify(token, secret) as { userId: string };
    if (!decoded?.userId) {
      res.status(401).json({ message: 'Invalid authentication token.' });
      return;
    }
    req.userId = decoded.userId;
    next();
  } catch {
    res
      .status(401)
      .json({ message: 'Invalid or expired session. Please log in again.' });
  }
};

