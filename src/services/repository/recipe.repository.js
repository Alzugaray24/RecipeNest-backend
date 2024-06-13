export default class RecipeRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = () => {
    return this.dao.getAll();
  };

  save = (newRecipe) => {
    return this.dao.save(newRecipe);
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

  getAllByCommentId = (id) => {
    return this.dao.getAllByCommentId(id);
  };
}
