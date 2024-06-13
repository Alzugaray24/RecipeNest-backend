import categoryModel from "../models/category.model.js";

export default class CategoryDao {
  constructor() {}

  getAll = async () => {
    try {
      const categories = await categoryModel.find();
      return categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error("Unable to fetch categories");
    }
  };

  save = async (categoryData) => {
    try {
      const newCategory = new categoryModel(categoryData);
      const savedCategory = await newCategory.save();
      return savedCategory;
    } catch (error) {
      console.error("Error saving category:", error);
      throw new Error("Unable to save category");
    }
  };

  update = async (id, updatedData) => {
    try {
      const updatedCategory = await categoryModel.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
      );
      if (!updatedCategory) {
        throw new Error("Category not found");
      }
      return updatedCategory;
    } catch (error) {
      console.error("Error updating category:", error);
      throw new Error("Unable to update category");
    }
  };

  delete = async (id) => {
    try {
      const deletedCategory = await categoryModel.findByIdAndDelete(id);
      if (!deletedCategory) {
        throw new Error("Category not found");
      }
      return deletedCategory;
    } catch (error) {
      console.error("Error deleting category:", error);
      throw new Error("Unable to delete category");
    }
  };

  findByName = async (name) => {
    try {
      const category = await categoryModel.findOne({ name });
      return category;
    } catch (error) {
      console.error("Error finding category by name:", error);
      throw new Error("Unable to find category by name");
    }
  };
}
