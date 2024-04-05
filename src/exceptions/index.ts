import { Request, Response, NextFunction } from 'express';

export const handleErrors = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error('Error:', err);

  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export class CustomError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
