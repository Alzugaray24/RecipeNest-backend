import ratingModel from "../models/rating.model.js";

export default class RatingDao {
  constructor() {}

  getAll = async () => {
    try {
      const rating = await ratingModel.find();
      return rating;
    } catch (error) {
      console.error("Error fetching rating:", error);
      throw new Error("Unable to fetch rating");
    }
  };

  save = async (ratingData) => {
    try {
      const newRating = new ratingModel(ratingData);
      const savedrating = await newRating.save();
      return savedrating;
    } catch (error) {
      console.error("Error saving rating:", error);
      throw new Error("Unable to save rating");
    }
  };

  update = async (id, updatedData) => {
    try {
      const updatedRating = await ratingModel.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
      );
      if (!updatedRating) {
        throw new Error("Rating not found");
      }
      return updatedRating;
    } catch (error) {
      console.error("Error updating rating:", error);
      throw new Error("Unable to update rating");
    }
  };

  delete = async (id) => {
    try {
      const deletedRating = await ratingModel.findByIdAndDelete(id);
      if (!deletedRating) {
        throw new Error("Rating not found");
      }
      return deletedRating;
    } catch (error) {
      console.error("Error deleting rating:", error);
      throw new Error("Unable to delete rating");
    }
  };

  findByRecipeAndUser = async (recipeId, userId) => {
    try {
      const rating = await ratingModel.findOne({
        recipe: recipeId,
        user: userId,
      });
      return rating;
    } catch (error) {
      console.error("Error finding rating by recipe and user:", error);
      throw new Error("Unable to find rating by recipe and user");
    }
  };
}
