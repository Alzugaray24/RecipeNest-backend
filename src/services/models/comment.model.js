import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  recipe: { type: Schema.Types.ObjectId, ref: "Recipe", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  parentComment: { type: Schema.Types.ObjectId, ref: "Comment" },
});

const Comment = model("Comment", commentSchema);

export default Comment;
