import TypeKitchens from '../models/type';
import TypeKitchen from '../interfaces/type.interface';

export default class TypeService {
  public static async findTypes(): Promise<TypeKitchen[]> {
    const types = await TypeKitchens.findAll();
    return types;
  }
}