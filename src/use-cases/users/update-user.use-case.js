import { Conflict, NotFound } from "../../errors/index.js";

export class UpdateUsersUseCase {
  repository;
  constructor(repository) {
    this.repository = repository;
  }

  execute(id, user) {
    const userExists = this.repository.findOne({
      searchableKey: "id",
      searchableValue: id,
    });

    if (!userExists) {
      throw new NotFound({
        error: "NotFound",
        user: "not exist",
        message: "User does not exist",
      });
    }

    if (user.email) {
      const emailExists = this.repository.findOne({
        searchableKey: "email",
        searchableValue: user.email,
      });

      if (emailExists) {
        throw new Conflict({
          error: "Conflict",
          email: "exists",
          message: "Email is already exists",
        });
      }
    }

    const data = {
      ...userExists,
      ...user,
    };

    this.repository.update(id, data);
  }
}
