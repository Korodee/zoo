import mongoose, { Document, Schema } from "mongoose";

export interface IAgeCategory extends Document {
  age_years: number; // exact integer age in years
  count: number; // number of users registered in this age
  cap: number; // maximum allowed (default 5000)
  unlocked: boolean; // true when count >= cap
  updated_at: Date;
  created_at: Date;
}

const ageCategorySchema = new Schema<IAgeCategory>(
  {
    age_years: { type: Number, required: true, min: 0, max: 130, unique: true, index: true },
    count: { type: Number, default: 0, min: 0, index: true },
    cap: { type: Number, default: 5000 },
    unlocked: { type: Boolean, default: false, index: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const AgeCategory = mongoose.model<IAgeCategory>("AgeCategory", ageCategorySchema);


