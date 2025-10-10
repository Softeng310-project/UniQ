import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

export default (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema, "users");
