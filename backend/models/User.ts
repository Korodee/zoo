import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
  is_member: boolean;
  is_verified: boolean;
  email_verification_token?: string | null;
  email_verification_expires?: Date | null;
  reset_password_token?: string | null;
  reset_password_expires?: Date | null;
  membership_date?: Date;
  created_at: Date;
  updated_at: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: { type: String, trim: true, default: "" },
    is_member: { type: Boolean, default: false, index: true },
    is_verified: { type: Boolean, default: false },
    email_verification_token: { type: String, default: null },
    email_verification_expires: { type: Date, default: null },
    reset_password_token: { type: String, default: null },
    reset_password_expires: { type: Date, default: null },
    membership_date: { type: Date, default: null },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export const User = mongoose.model<IUser>("User", userSchema);
