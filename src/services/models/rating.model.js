import { Schema, model } from "mongoose";

const ratingSchema = new Schema({
  recipe: { type: Schema.Types.ObjectId, ref: "Recipe", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Rating = model("Rating", ratingSchema);

export default Rating;
 