import userModel from "../models/user.model.js";

export default class AuthService {
  constructor() {}

  save = async (user) => {
    try {
      const newUser = new userModel(user);
      await newUser.save();
      return newUser;
    } catch (error) {
      console.error("Error saving user:", error);
      throw new Error("Unable to save user");
    }
  };

  login = async (email) => {
    try {
      const newUser = new userModel(user);
      await newUser.save();
      return newUser;
    } catch (error) {
      console.error("Error saving user:", error);
      throw new Error("Unable to save user");
    }
  };
}
