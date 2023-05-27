import { Request, Response, NextFunction } from 'express';
import TypeService from '../services/type.service';

export default class TypeController {
  static async findType(req: Request, res: Response, next: NextFunction) {
    try {
      const types = await TypeService.findTypes();
      return res.status(200).json(types);
    } catch (error) {
      next(error);
    }
  }
}