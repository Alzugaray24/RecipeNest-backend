import recipeModel from "../models/recipe.model.js";

export default class RecipeDao {
  constructor() {}

  getAll = async () => {
    try {
      const recipes = await recipeModel.find();
      return recipes;
    } catch (error) {
      console.error("Error fetching recipes:", error);
      throw new Error("Unable to fetch recipes");
    }
  };

  save = async (recipeData) => {
    try {
      const newRecipe = new recipeModel(recipeData);
      const savedRecipe = await newRecipe.save();
      return savedRecipe;
    } catch (error) {
      console.error("Error saving recipe:", error);
      throw new Error("Unable to save recipe");
    }
  };

  update = async (id, updatedData) => {
    try {
      const updatedRecipe = await recipeModel.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
      );
      if (!updatedRecipe) {
        throw new Error("Recipe not found");
      }
      return updatedRecipe;
    } catch (error) {
      console.error("Error updating recipe:", error);
      throw new Error("Unable to update recipe");
    }
  };

  delete = async (id) => {
    try {
      const deletedRecipe = await recipeModel.findByIdAndDelete(id);
      if (!deletedRecipe) {
        throw new Error("Recipe not found");
      }
      return deletedRecipe;
    } catch (error) {
      console.error("Error deleting recipe:", error);
      throw new Error("Unable to delete recipe");
    }
  };

  getById = async (id) => {
    try {
      const recipe = await recipeModel.findById(id);
      if (!recipe) {
        throw new Error("Recipe not found");
      }
      return recipe;
    } catch (error) {
      console.error("Error fetching Recipe by ID:", error);
      throw new Error("Unable to fetch Recipe by ID");
    }
  };

  getAllByCommentId = async (commentId) => {
    try {
      const recipes = await recipeModel.find({ comments: commentId });
      return recipes;
    } catch (error) {
      console.error("Error fetching recipes by comment ID:", error);
      throw new Error("Unable to fetch recipes by comment ID");
    }
  };
}
