import { CustomException } from '../../common/exceptions/custom-exception';
import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

export const errorHandlerMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  if (error instanceof CustomException) {
    res.status(error.code).json({ error: error.message });
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
}
