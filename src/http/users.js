import { ListUsersController } from "../controllers/users/list-users.controller.js";
import { CreateUserController } from "../controllers/users/create-user.controller.js";
import { DeleteUsersController } from "../controllers/users/delete-user.controller.js";
import { UpdateUsersController } from "../controllers/users/update-user.controller.js";
import { buildRoutePath } from "./support/buildRoutePath.js";

export class userRoutes {
  userRepository;
  constructor(repository) {
    this.userRepository = repository;
  }

  getRoutes() {
    return [
      {
        method: "GET",
        path: buildRoutePath("/users"),
        handler: (request, response) => {
          const listUsersController = new ListUsersController(
            this.userRepository
          );
          return listUsersController.handler(request, response);
        },
      },

      {
        method: "POST",
        path: buildRoutePath("/users"),
        handler: (request, response) => {
          const createUserController = new CreateUserController(
            this.userRepository
          );
          return createUserController.handler(request, response);
        },
      },

      {
        method: "PUT",
        path: buildRoutePath("/users/:id"),
        handler: (request, response) => {
          const updateUserController = new UpdateUsersController(this.userRepository)
          return updateUserController.handler(request, response);
        },
      },

      {
        method: "DELETE",
        path: buildRoutePath("/users/:id"),
        handler: (request, response) => {
          const deleteUsersController = new DeleteUsersController(
            this.userRepository
          );
          return deleteUsersController.handler(request, response);
        },
      },
    ];
  }
}
