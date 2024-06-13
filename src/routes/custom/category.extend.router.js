import CustomRouter from "./custom.router.js";
import {
  getAllCategoriesController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from "../../controllers/category.controller.js";

export default class CategoryExtendRouter extends CustomRouter {
  init() {
    this.get("/", ["USER"], getAllCategoriesController);
    this.post("/", ["USER"], createCategoryController);
    this.put("/:categoryId", ["USER"], updateCategoryController);
    this.delete("/:categoryId", ["USER"], deleteCategoryController);
  }
}
