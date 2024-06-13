import { recipeService } from "../services/services.js";
import { getUserIdFromToken } from "../dirname.js";

export const getAllRecipeController = async (req, res) => {
  try {
    const recipes = await recipeService.getAll();

    if (recipes.length === 0) {
      req.logger.info(
        `[${new Date().toLocaleString()}] [GET] ${
          req.originalUrl
        } - There are no recipes to search`
      );
      return res.status(400).send({
        status: "error",
        message: "There are no recipes to search",
      });
    }

    req.logger.info(
      `[${new Date().toLocaleString()}] [GET] ${
        req.originalUrl
      } - Successfully retrieved recipes`
    );
    res.status(200).send({
      status: "success",
      recipes,
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    req.logger.error(
      `[${new Date().toLocaleString()}] [GET] ${
        req.originalUrl
      } - Error fetching recipes: ${error.message}`
    );
    res.status(500).send({
      status: "error",
      message: "Unable to fetch recipes.",
    });
  }
};

export const createRecipeController = async (req, res) => {
  try {
    const { title, description, ingredients, instructions, category, image } =
      req.body;

    if (!title || !ingredients || !instructions) {
      req.logger.error(
        `[${new Date().toLocaleString()}] [POST] ${
          req.originalUrl
        } - Title, ingredients, and instructions are required.`
      );
      return res.status(400).send({
        status: "error",
        message: "Title, ingredients, and instructions are required.",
      });
    }

    let author;
    try {
      author = getUserIdFromToken(req.headers.cookie);
    } catch (error) {
      req.logger.error(
        `[${new Date().toLocaleString()}] [POST] ${
          req.originalUrl
        } - Invalid or missing authentication token.`
      );
      return res.status(401).send({
        status: "error",
        message: "Invalid or missing authentication token.",
      });
    }

    const recipeData = {
      title,
      description,
      ingredients,
      instructions,
      category,
      image,
      author,
    };

    const newRecipe = await recipeService.save(recipeData);

    req.logger.info(
      `[${new Date().toLocaleString()}] [POST] ${
        req.originalUrl
      } - success creating a recipe`
    );
    res.status(201).send({
      status: "success",
      newRecipe,
    });
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).send({
      status: "error",
      message: "Unable to create recipe.",
    });
  }
};

export const updateRecipeController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, ingredients, instructions, category, image } =
      req.body;

    if (!title || !ingredients || !instructions) {
      req.logger.error(
        `[${new Date().toLocaleString()}] [PUT] ${
          req.originalUrl
        } - Title, ingredients, and instructions are required.`
      );
      return res.status(400).send({
        status: "error",
        message: "Title, ingredients, and instructions are required.",
      });
    }

    const updatedRecipe = await recipeService.update(id, {
      title,
      description,
      ingredients,
      instructions,
      category,
      image,
    });

    if (!updatedRecipe) {
      req.logger.warn(
        `[${new Date().toLocaleString()}] [PUT] ${
          req.originalUrl
        } - Recipe not found.`
      );
      return res.status(404).send({
        status: "error",
        message: "Recipe not found.",
      });
    }

    req.logger.info(
      `[${new Date().toLocaleString()}] [PUT] ${
        req.originalUrl
      } - Successfully updated recipe.`
    );
    res.status(200).send({
      status: "success",
      updatedRecipe,
    });
  } catch (error) {
    console.error("Error updating recipe:", error);
    req.logger.error(
      `[${new Date().toLocaleString()}] [PUT] ${
        req.originalUrl
      } - Error updating recipe: ${error.message}`
    );
    res.status(500).send({
      status: "error",
      message: "Unable to update recipe.",
    });
  }
};

export const deleteRecipeController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRecipe = await recipeService.delete(id);

    if (!deletedRecipe) {
      req.logger.warn(
        `[${new Date().toLocaleString()}] [DELETE] ${
          req.originalUrl
        } - Recipe not found.`
      );
      return res.status(404).send({
        status: "error",
        message: "Recipe not found.",
      });
    }

    req.logger.info(
      `[${new Date().toLocaleString()}] [DELETE] ${
        req.originalUrl
      } - Successfully deleted recipe.`
    );
    res.status(200).send({
      status: "success",
      message: "Recipe successfully deleted.",
    });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    req.logger.error(
      `[${new Date().toLocaleString()}] [DELETE] ${
        req.originalUrl
      } - Error deleting recipe: ${error.message}`
    );
    res.status(500).send({
      status: "error",
      message: "Unable to delete recipe.",
    });
  }
};
