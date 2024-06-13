import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["USER", "USER_PREMIUM", "ADMIN"],
    default: "USER",
  },
  profilePicture: { type: String },
  favoriteRecipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
