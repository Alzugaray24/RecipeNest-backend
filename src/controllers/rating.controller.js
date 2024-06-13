import { ratingService, recipeService } from "../services/services.js";
import { getUserIdFromToken } from "../dirname.js";

export const getAllRatingController = async (req, res) => {
  try {
    const ratings = await ratingService.getAll();

    if (ratings.length === 0) {
      req.logger.error(
        `[${new Date().toLocaleString()}] [GET] ${
          req.originalUrl
        } - No ratings found`
      );
      return res.status(400).send({
        status: "error",
        message: "No ratings found",
      });
    }
    res.status(200).send({
      status: "success",
      ratings,
    });
  } catch (error) {
    req.logger.error(
      `[${new Date().toLocaleString()}] [GET] ${
        req.originalUrl
      } - Error fetching ratings: ${error.message}`
    );
    res.status(500).send({
      status: "error",
      message: "Unable to fetch ratings.",
    });
  }
};

export const createRatingController = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const recipeId = req.params.recipeId;

    if (!rating || !recipeId) {
      req.logger.error(
        `[${new Date().toLocaleString()}] [POST] ${
          req.originalUrl
        } - Rating and recipeId are required.`
      );
      return res.status(400).send({
        status: "error",
        message: "Rating and recipeId are required.",
      });
    }

    if (rating < 1 || rating > 5) {
      req.logger.error(
        `[${new Date().toLocaleString()}] [POST] ${
          req.originalUrl
        } - Rating must be between 1 and 5.`
      );
      return res.status(400).send({
        status: "error",
        message: "Rating must be between 1 and 5.",
      });
    }

    let user;
    try {
      user = getUserIdFromToken(req.headers.cookie);
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

    let recipe;
    try {
      recipe = await recipeService.getById(recipeId);
      if (!recipe) {
        req.logger.error(
          `[${new Date().toLocaleString()}] [POST] ${
            req.originalUrl
          } - Recipe not found.`
        );
        return res.status(404).send({
          status: "error",
          message: "Recipe not found.",
        });
      }
    } catch (error) {
      req.logger.error(
        `[${new Date().toLocaleString()}] [POST] ${
          req.originalUrl
        } - Error fetching Recipe by ID: ${error.message}`
      );
      return res.status(500).send({
        status: "error",
        message: `Recipe not found`,
      });
    }

    const existingRating = await ratingService.findByRecipeAndUser(
      recipeId,
      user
    );

    if (existingRating) {
      req.logger.error(
        `[${new Date().toLocaleString()}] [POST] ${
          req.originalUrl
        } - User has already rated this recipe.`
      );
      return res.status(400).send({
        status: "error",
        message: "You have already rated this recipe.",
      });
    }

    const ratingData = {
      rating,
      comment,
      recipe: recipeId,
      user,
    };

    const newRating = await ratingService.save(ratingData);

    recipe.ratings.push(newRating._id);
    await recipe.save();

    req.logger.info(
      `[${new Date().toLocaleString()}] [POST] ${
        req.originalUrl
      } - Successfully created a rating.`
    );
    res.status(201).send({
      status: "success",
      newRating,
    });
  } catch (error) {
    req.logger.error(
      `[${new Date().toLocaleString()}] [POST] ${
        req.originalUrl
      } - Error creating rating: ${error.message}`
    );
    res.status(500).send({
      status: "error",
      message: "Unable to create rating.",
    });
  }
};

export const updateRatingController = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { ratingId } = req.params;

    if (!rating) {
      req.logger.error(
        `[${new Date().toLocaleString()}] [PUT] ${
          req.originalUrl
        } - Rating is required.`
      );
      return res.status(400).send({
        status: "error",
        message: "Rating is required.",
      });
    }

    if (rating < 1 || rating > 5) {
      req.logger.error(
        `[${new Date().toLocaleString()}] [PUT] ${
          req.originalUrl
        } - Rating must be between 1 and 5.`
      );
      return res.status(400).send({
        status: "error",
        message: "Rating must be between 1 and 5.",
      });
    }

    const updatedData = {
      rating,
      comment,
    };

    const updatedRating = await ratingService.update(ratingId, updatedData);

    if (!updatedRating) {
      req.logger.error(
        `[${new Date().toLocaleString()}] [PUT] ${
          req.originalUrl
        } - Rating not found.`
      );
      return res.status(404).send({
        status: "error",
        message: "Rating not found.",
      });
    }

    req.logger.info(
      `[${new Date().toLocaleString()}] [PUT] ${
        req.originalUrl
      } - Successfully updated rating.`
    );
    res.status(200).send({
      status: "success",
      updatedRating,
    });
  } catch (error) {
    req.logger.error(
      `[${new Date().toLocaleString()}] [PUT] ${
        req.originalUrl
      } - Error updating rating: ${error.message}`
    );
    res.status(500).send({
      status: "error",
      message: "Unable to update rating.",
    });
  }
};

export const deleteRatingController = async (req, res) => {
  try {
    const { ratingId } = req.params;

    const deletedRating = await ratingService.delete(ratingId);

    if (!deletedRating) {
      req.logger.error(
        `[${new Date().toLocaleString()}] [DELETE] ${
          req.originalUrl
        } - Rating not found.`
      );
      return res.status(404).send({
        status: "error",
        message: "Rating not found.",
      });
    }

    const recipeId = deletedRating.recipe;

    if (recipeId) {
      const recipe = await recipeService.getById(recipeId);

      if (recipe) {
        recipe.ratings = recipe.ratings.filter(
          (r) => r.toString() !== ratingId
        );
        await recipe.save();
      }
    }

    req.logger.info(
      `[${new Date().toLocaleString()}] [DELETE] ${
        req.originalUrl
      } - Successfully deleted rating and updated associated recipe.`
    );
    res.status(200).send({
      status: "success",
      deletedRating,
    });
  } catch (error) {
    req.logger.error(
      `[${new Date().toLocaleString()}] [DELETE] ${
        req.originalUrl
      } - Error deleting rating: ${error.message}`
    );
    res.status(500).send({
      status: "error",
      message: "Unable to delete rating.",
    });
  }
};
