import CustomRouter from "./custom.router.js";
import {
  getAllCommentController,
  createCommentController,
  updateCommentController,
  deleteCommentController,
} from "../../controllers/comment.controller.js";

export default class CommentExtendRouter extends CustomRouter {
  init() {
    this.get("/", ["USER"], getAllCommentController);
    this.post("/:recipeId", ["USER"], createCommentController);
    this.put("/:commentId", ["USER"], updateCommentController);
    this.delete("/:commentId", ["USER"], deleteCommentController);
  }
}
