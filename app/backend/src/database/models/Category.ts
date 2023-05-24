import { INTEGER, Model, STRING } from 'sequelize';
import ICategory from '../interfaces/category.interface';
import sequelize from '.';

export default class Category extends Model implements ICategory {
  declare id: number;
  declare category: string;
}

Category.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category: {
      type: STRING(30),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'categories',
    timestamps: false,
    underscored: true,
  },
);
