import mongoose from "mongoose";

class MongoSingleton {
  static #instance;

  constructor() {
    this.#connectMongoDB();
  }

  static getInstance() {
    if (this.#instance) {
    } else {
      this.#instance = new MongoSingleton();
    }
    return this.#instance;
  }

  #connectMongoDB = async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017/recipe-app-backend");
    } catch (error) {
      console.error("No se pudo conectar a la BD usando Moongose: " + error);
      process.exit();
    }
  };
}

export default MongoSingleton;
