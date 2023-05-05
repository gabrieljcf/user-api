import { UserRepository } from "../repositories/users/user.repository.js";
import { Database } from "../database/file.js";
import { userRoutes } from "./users.js";

const database = new Database();
const userRepository = new UserRepository(database);

export class Routes {
  request;
  response;

  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  static #makeRoutes() {
    const userReoutes = new userRoutes(userRepository);
    return [...userReoutes.getRoutes()]
  }

  static getRoutes() {
    return this.#makeRoutes();
  }
}
