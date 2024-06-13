import userModel from "../models/user.model.js";

export default class UserService {
  constructor() {}

  getAll = async () => {
    try {
      const users = await userModel.find();
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Unable to fetch users");
    }
  };

  update = async (userId, userData) => {
    try {
      const updatedUser = await userModel.findByIdAndUpdate(userId, userData, {
        new: true,
      });
      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Unable to update user");
    }
  };

  delete = async (userId) => {
    try {
      const deletedUser = await userModel.findByIdAndDelete(userId);
      return deletedUser;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Unable to delete user");
    }
  };

  findByEmail = async (email) => {
    try {
      const user = await userModel.findOne({ email: email });
      return user;
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw new Error("Unable to find user by email");
    }
  };

  findByName = async (name) => {
    try {
      const user = await userModel.findOne({ userName: name });
      return user;
    } catch (error) {
      console.error("Error finding user by username:", error);
      throw new Error("Unable to find user by username");
    }
  };

  findUserById = async (id) => {
    try {
      const user = await userModel.findById(id);
      return user;
    } catch (error) {
      console.error("Error finding user by ID:", error);
      throw new Error("Unable to find user by ID");
    }
  };
}
