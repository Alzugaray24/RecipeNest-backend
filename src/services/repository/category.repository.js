export default class CategoryRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = () => {
    return this.dao.getAll();
  };

  save = (newCategory) => {
    return this.dao.save(newCategory);
  };

  update = (id, updatedData) => {
    return this.dao.update(id, updatedData);
  };

  delete = (id) => {
    return this.dao.delete(id);
  };

  findByName = (id) => {
    return this.dao.findByName(id);
  };
}
