import Category from '../models/Category';
import ICategory from '../interfaces/category.interface';

export default class CategoryService {
  public static async getAllCategories(): Promise<ICategory[]> {
    const categories = await Category.findAll();
    return categories;
  }
}