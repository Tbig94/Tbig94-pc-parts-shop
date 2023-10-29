import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
} from "sequelize-typescript";

@Table({
  tableName: "BaseProduct",
})
export class BaseProduct extends Model<BaseProduct> {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  image: string;

  @Column({
    type: DataType.STRING,
  })
  rating: string;

  @Column({
    type: DataType.STRING,
  })
  minPrice: string;

  @Column({
    type: DataType.STRING,
  })
  maxPrice: string;

  @Column({
    type: DataType.TEXT("long"),
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
  })
  numberOfClicks: number;
}
