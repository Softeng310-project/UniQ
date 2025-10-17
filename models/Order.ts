import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { IUserCartItem } from "./User";

export interface IOrderItem extends IUserCartItem {}

export interface IOrder extends Document {
  user: Types.ObjectId;
  items: IOrderItem[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema: Schema<IOrderItem> = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    category: { type: String },
    degree: { type: String },
    condition: { type: String },
    description: { type: String },
  },
  { _id: false }
);

const OrderSchema: Schema<IOrder> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [OrderItemSchema], required: true },
    total: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export default (mongoose.models.Order as Model<IOrder>) ||
  mongoose.model<IOrder>("Order", OrderSchema, "orders");
