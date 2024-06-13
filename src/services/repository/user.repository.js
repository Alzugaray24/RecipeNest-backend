export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = () => {
    return this.dao.getAll();
  };

  save = (user) => {
    return this.dao.save(user);
  };

  update = (userId, userData) => {
    return this.dao.update(userId, userData);
  };

  delete = (userId) => {
    return this.dao.delete(userId);
  };

  findByEmail = (email) => {
    return this.dao.findByEmail(email);
  };

  findUserById = (id) => {
    return this.dao.findUserById(id);
  };

  findByName = (name) => {
    return this.dao.findByName(name);
  };
}
