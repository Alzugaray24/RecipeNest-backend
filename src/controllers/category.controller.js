import { categoryService } from "../services/services.js";

export const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await categoryService.getAll();

    if (categories.length === 0) {
      req.logger.error(
        `[${new Date().toLocaleString()}] [GET] ${
          req.originalUrl
        } - No categories found`
      );
      return res.status(400).send({
        status: "error",
        message: "No categories found",
      });
    }
    req.logger.info(
      `[${new Date().toLocaleString()}] [GET] ${
        req.originalUrl
      } - Successfully fetched all categories`
    );
    res.status(200).send({
      status: "success",
      categories,
    });
  } catch (error) {
    req.logger.error(
      `[${new Date().toLocaleString()}] [GET] ${
        req.originalUrl
      } - Error fetching categories: ${error.message}`
    );
    res.status(500).send({
      status: "error",
      message: "Unable to fetch categories.",
    });
  }
};

export const createCategoryController = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      req.logger.error(
        `[${new Date().toLocaleString()}] [POST] ${
          req.originalUrl
        } - Name is required.`
      );
      return res.status(400).send({
        status: "error",
        message: "Name is required.",
      });
    }

    const categoryData = {
      name,
      description,
    };

    const newCategory = await categoryService.save(categoryData);

    req.logger.info(
      `[${new Date().toLocaleString()}] [POST] ${
        req.originalUrl
      } - Successfully created a category`
    );
    res.status(201).send({
      status: "success",
      newCategory,
    });
  } catch (error) {
    req.logger.error(
      `[${new Date().toLocaleString()}] [POST] ${
        req.originalUrl
      } - Error creating category: ${error.message}`
    );
    res.status(500).send({
      status: "error",
      message: "Unable to create category.",
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const updatedData = req.body;

    if (!updatedData.name) {
      req.logger.error(
        `[${new Date().toLocaleString()}] [PUT] ${
          req.originalUrl
        } - Category name is required`
      );
      return res.status(400).send({
        status: "error",
        message: "Category name is required.",
      });
    }

    const updatedCategory = await categoryService.update(
      categoryId,
      updatedData
    );

    req.logger.info(
      `[${new Date().toLocaleString()}] [PUT] ${
        req.originalUrl
      } - Successfully updated the category`
    );
    res.status(200).send({
      status: "success",
      updatedCategory,
    });
  } catch (error) {
    req.logger.error(
      `[${new Date().toLocaleString()}] [PUT] ${
        req.originalUrl
      } - Error updating category: ${error.message}`
    );
    res.status(500).send({
      status: "error",
      message: "Unable to update category.",
    });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const deletedCategory = await categoryService.delete(categoryId);

    if (!deletedCategory) {
      req.logger.error(
        `[${new Date().toLocaleString()}] [DELETE] ${
          req.originalUrl
        } - Category not found`
      );
      return res.status(404).send({
        status: "error",
        message: "Category not found.",
      });
    }

    req.logger.info(
      `[${new Date().toLocaleString()}] [DELETE] ${
        req.originalUrl
      } - Successfully deleted the category`
    );
    res.status(200).send({
      status: "success",
      message: "Category successfully deleted.",
    });
  } catch (error) {
    req.logger.error(
      `[${new Date().toLocaleString()}] [DELETE] ${
        req.originalUrl
      } - Error deleting category: ${error.message}`
    );
    res.status(500).send({
      status: "error",
      message: "Unable to delete category.",
    });
  }
};
