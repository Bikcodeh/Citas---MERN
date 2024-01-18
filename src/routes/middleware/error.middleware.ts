import { CustomException } from '../../common/exceptions/custom-exception';
import { Request, Response, NextFunction } from 'express';

export const errorHandlerMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomException) {
    res.status(error.code).json({ error: error.message });
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
}
