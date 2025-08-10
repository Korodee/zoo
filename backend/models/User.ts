import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
  is_member: boolean;
  is_verified: boolean;
  membership_date?: Date;
  email_verification_token?: string;
  email_verification_expires?: Date;
  reset_password_token?: string;
  reset_password_expires?: Date;
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
      minlength: 6,
    },
    name: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    is_member: {
      type: Boolean,
      default: false,
      index: true,
    },
    is_verified: {
      type: Boolean,
      default: false,
      index: true,
    },
    membership_date: {
      type: Date,
    },
    email_verification_token: {
      type: String,
      index: true,
    },
    email_verification_expires: {
      type: Date,
    },
    reset_password_token: {
      type: String,
      index: true,
    },
    reset_password_expires: {
      type: Date,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

// Compound index for email verification
userSchema.index({ email: 1, email_verification_token: 1 });

// Compound index for password reset
userSchema.index({ email: 1, reset_password_token: 1 });

// TTL index to automatically clean up expired tokens
userSchema.index(
  { email_verification_expires: 1 },
  { expireAfterSeconds: 0, partialFilterExpression: { email_verification_expires: { $exists: true } } }
);

userSchema.index(
  { reset_password_expires: 1 },
  { expireAfterSeconds: 0, partialFilterExpression: { reset_password_expires: { $exists: true } } }
);

export const User = mongoose.model<IUser>("User", userSchema);
