import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
} from "sequelize-typescript";

@Table({
  tableName: "Order",
})
export class Order extends Model<Order> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  customerName: string;

  @Column({
    type: DataType.STRING,
  })
  customerEmailAddress: string;

  @Column({
    type: DataType.STRING,
  })
  customerPhoneNumber: string;

  @Column({
    type: DataType.STRING,
  })
  customerCountry: string;

  @Column({
    type: DataType.STRING,
  })
  customerAddress: string;

  @Column({
    type: DataType.STRING,
  })
  productIds: string;

  @Column({
    type: DataType.STRING,
  })
  totalPrice: string;
}
