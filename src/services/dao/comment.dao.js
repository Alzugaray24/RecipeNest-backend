import commentModel from "../models/comment.model.js";

export default class CommentDao {
  constructor() {}

  getAll = async () => {
    try {
      const comments = await commentModel
        .find()
        .populate("recipe")
        .populate("user")
        .populate("parentComment");
      return comments;
    } catch (error) {
      console.error("Error fetching comments:", error);
      throw new Error("Unable to fetch comments");
    }
  };

  getById = async (id) => {
    try {
      const comment = await commentModel
        .findById(id)
        .populate("recipe")
        .populate("user")
        .populate("parentComment");
      if (!comment) {
        throw new Error("Comment not found");
      }
      return comment;
    } catch (error) {
      console.error("Error fetching comment by ID:", error);
      throw new Error("Unable to fetch comment by ID");
    }
  };

  save = async (commentData) => {
    try {
      const newComment = new commentModel(commentData);
      const savedComment = await newComment.save();
      return savedComment;
    } catch (error) {
      console.error("Error saving comment:", error);
      throw new Error("Unable to save comment");
    }
  };

  update = async (id, updatedData) => {
    try {
      const updatedComment = await commentModel
        .findByIdAndUpdate(id, updatedData, { new: true })
        .populate("recipe")
        .populate("user")
        .populate("parentComment");
      if (!updatedComment) {
        throw new Error("Comment not found");
      }
      return updatedComment;
    } catch (error) {
      console.error("Error updating comment:", error);
      throw new Error("Unable to update comment");
    }
  };

  delete = async (id) => {
    try {
      const deletedComment = await commentModel.findByIdAndDelete(id);
      if (!deletedComment) {
        throw new Error("Comment not found");
      }
      return deletedComment;
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw new Error("Unable to delete comment");
    }
  };

  getByRecipe = async (recipeId) => {
    try {
      const comments = await commentModel
        .find({ recipe: recipeId })
        .populate("recipe")
        .populate("user")
        .populate("parentComment");
      return comments;
    } catch (error) {
      console.error("Error fetching comments by recipe:", error);
      throw new Error("Unable to fetch comments by recipe");
    }
  };

  getByUser = async (userId) => {
    try {
      const comments = await commentModel
        .find({ user: userId })
        .populate("recipe")
        .populate("user")
        .populate("parentComment");
      return comments;
    } catch (error) {
      console.error("Error fetching comments by user:", error);
      throw new Error("Unable to fetch comments by user");
    }
  };
}
