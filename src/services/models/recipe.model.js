import { Schema, model } from "mongoose";

const recipeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  ingredients: { type: [String], required: true },
  instructions: { type: [String], required: true },
  category: { type: String },
  image: { type: String },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Recipe = model("Recipe", recipeSchema);

export default Recipe;
