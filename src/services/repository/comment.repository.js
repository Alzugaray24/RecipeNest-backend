export default class CommentRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = () => {
    return this.dao.getAll();
  };

  save = (newComment) => {
    return this.dao.save(newComment);
  };

  update = (id, updatedData) => {
    return this.dao.update(id, updatedData);
  };

  delete = (id) => {
    return this.dao.delete(id);
  };

  getById = (id) => {
    return this.dao.getById(id);
  };

  getByRecipe = (recipeId) => {
    return this.dao.getByRecipe(recipeId);
  };

  getByUser = (userId) => {
    return this.dao.getByUser(userId);
  };

  findByRecipeAndUser = (recipeId, userId) => {
    return this.dao.findByRecipeAndUser(recipeId, userId);
  };
}
