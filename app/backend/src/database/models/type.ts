import { INTEGER, Model, STRING } from 'sequelize';
import sequelize from '.';
import TypeKitchen from '../interfaces/type.interface';

export default class TypeKitchens extends Model implements TypeKitchen {
  declare id: number;
  declare nameType: string;
}

TypeKitchens.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nameType: {
      type: STRING(30),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'type_kitchens',
    timestamps: false,
    underscored: true,
  },
);
