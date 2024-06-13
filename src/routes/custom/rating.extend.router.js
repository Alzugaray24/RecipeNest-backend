import CustomRouter from "./custom.router.js";
import {
  getAllRatingController,
  createRatingController,
  updateRatingController,
  deleteRatingController,
} from "../../controllers/rating.controller.js";

export default class RatingExtendRouter extends CustomRouter {
  init() {
    this.get("/", ["USER"], getAllRatingController);
    this.post("/:recipeId", ["USER"], createRatingController);
    this.put("/:ratingId", ["USER"], updateRatingController);
    this.delete("/:ratingId", ["USER"], deleteRatingController);
  }
}
