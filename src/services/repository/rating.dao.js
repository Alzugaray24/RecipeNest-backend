export default class RatingRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = () => {
    return this.dao.getAll();
  };

  save = (newRating) => {
    return this.dao.save(newRating);
  };

  update = (id, updatedData) => {
    return this.dao.update(id, updatedData);
  };

  delete = (id) => {
    return this.dao.delete(id);
  };

  findByRecipeAndUser = (recipeId, userId) => {
    return this.dao.findByRecipeAndUser(recipeId, userId);
  };
}
