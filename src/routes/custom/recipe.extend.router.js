import CustomRouter from "./custom.router.js";
import {
  getAllRecipeController,
  createRecipeController,
  updateRecipeController,
  deleteRecipeController,
} from "../../controllers/recipe.controller.js";

export default class RecipeExtendRouter extends CustomRouter {
  init() {
    this.get("/", ["USER"], getAllRecipeController);
    this.post("/", ["USER"], createRecipeController);
    this.put("/:id", ["USER"], updateRecipeController);
    this.delete("/:id", ["USER"], deleteRecipeController);
  }
}
