import UserService from "./dao/user.dao.js";
import UserRepository from "./repository/user.repository.js";
import AuthRepository from "./repository/auth.repository.js";
import AuthService from "./dao/auth.dao.js";
import RecipeRepository from "./repository/recipe.repository.js";
import RecipeService from "./dao/recipe.dao.js";
import RatingService from "./dao/rating.dao.js";
import RatingRepository from "./repository/rating.dao.js";
import CategoryRepository from "./repository/category.repository.js";
import CategoryService from "./dao/category.dao.js";
import CommentRepository from "./repository/comment.repository.js";
import CommentService from "./dao/comment.dao.js";

const userDao = new UserService();
const authDao = new AuthService();
const recipeDao = new RecipeService();
const ratingDao = new RatingService();
const categoryDao = new CategoryService();
const commentDao = new CommentService();

export const userService = new UserRepository(userDao);
export const authService = new AuthRepository(authDao);
export const recipeService = new RecipeRepository(recipeDao);
export const ratingService = new RatingRepository(ratingDao);
export const categoryService = new CategoryRepository(categoryDao);
export const commentService = new CommentRepository(commentDao);
