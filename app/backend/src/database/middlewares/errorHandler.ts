import { NextFunction, Request, Response } from 'express';
import HttpError from '../../utils/httpError';

const errorHandler = (err: HttpError, _req: Request, res: Response, _next: NextFunction) =>
  res.status(err.status || 500).json({ message: err.message });

export default errorHandler;