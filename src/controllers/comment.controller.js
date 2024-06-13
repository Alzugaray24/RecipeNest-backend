import { commentService, recipeService } from "../services/services.js";
import { getUserIdFromToken } from "../dirname.js";

export const getAllCommentController = async (req, res) => {
  try {
    const comments = await commentService.getAll();

    res.status(200).send({
      status: "success",
      comments,
    });
  } catch (error) {
    req.logger.error(
      `[${new Date().toLocaleString()}] [GET] ${
        req.originalUrl
      } - Error fetching comments: ${error.message}`
    );
    res.status(500).send({
      status: "error",
      message: "Unable to fetch comments.",
    });
  }
};

export const createCommentController = async (req, res) => {
  try {
    const { content } = req.body;
    const recipeId = req.params.recipeId;

    if (!content || !recipeId) {
      req.logger.error(
        `[${new Date().toLocaleString()}] [POST] ${
          req.originalUrl
        } - Content and recipeId are required.`
      );
      return res.status(400).send({
        status: "error",
        message: "Content and recipeId are required.",
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
        message: "Recipe not found",
      });
    }

    const commentData = {
      content,
      recipe: recipeId,
      user,
    };

    const newComment = await commentService.save(commentData);

    recipe.comments.push(newComment._id);

    await recipe.save();

    req.logger.info(
      `[${new Date().toLocaleString()}] [POST] ${
        req.originalUrl
      } - Successfully created a comment.`
    );
    res.status(201).send({
      status: "success",
      newComment,
    });
  } catch (error) {
    req.logger.error(
      `[${new Date().toLocaleString()}] [POST] ${
        req.originalUrl
      } - Error creating comment: ${error.message}`
    );
    res.status(500).send({
      status: "error",
      message: "Unable to create comment.",
    });
  }
};

export const updateCommentController = async (req, res) => {
  try {
    const { content } = req.body;
    const commentId = req.params.commentId;

    if (!content) {
      req.logger.error(
        `[${new Date().toLocaleString()}] [PUT] ${
          req.originalUrl
        } - Content is required.`
      );
      return res.status(400).send({
        status: "error",
        message: "Content is required.",
      });
    }

    const updatedComment = await commentService.update(commentId, { content });

    req.logger.info(
      `[${new Date().toLocaleString()}] [PUT] ${
        req.originalUrl
      } - Successfully updated comment.`
    );
    res.status(200).send({
      status: "success",
      updatedComment,
    });
  } catch (error) {
    req.logger.error(
      `[${new Date().toLocaleString()}] [PUT] ${
        req.originalUrl
      } - Error updating comment: ${error.message}`
    );
    res.status(500).send({
      status: "error",
      message: "Unable to update comment.",
    });
  }
};

export const deleteCommentController = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    await commentService.delete(commentId);

    const recipesToUpdate = await recipeService.getAllByCommentId(commentId);

    for (let recipe of recipesToUpdate) {
      recipe.comments = recipe.comments.filter(
        (id) => id.toString() !== commentId
      );
      await recipe.save();
    }

    req.logger.info(
      `[${new Date().toLocaleString()}] [DELETE] ${
        req.originalUrl
      } - Successfully deleted comment.`
    );
    res.status(200).json({
      status: "success",
      message: "Comment deleted successfully.",
    });
  } catch (error) {
    req.logger.error(
      `[${new Date().toLocaleString()}] [DELETE] ${
        req.originalUrl
      } - Error deleting comment: ${error.message}`
    );
    res.status(500).json({
      status: "error",
      message: "Unable to delete comment.",
    });
  }
};
