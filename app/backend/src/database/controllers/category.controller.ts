import { Request, Response, NextFunction } from 'express';
import CategoryService from '../services/category.service';

export default class CategoryController {
  static async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryService.getAllCategories();
      return res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }
}