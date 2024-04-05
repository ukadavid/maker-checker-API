import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

export const handleErrors: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error('Error:', err);

  res.status(500).json({ error: 'Internal server error' });
};
