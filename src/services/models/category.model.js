import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Category = model("Category", categorySchema);

export default Category;
