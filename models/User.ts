import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUserCartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  category?: string;
  degree?: string;
  condition?: string;
  description?: string;
}

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  firstName?: string;
  lastName?: string;
  cartItems: IUserCartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const CartItemSchema: Schema<IUserCartItem> = new Schema(
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

const UserSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    cartItems: { type: [CartItemSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

export default (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema, "users");
