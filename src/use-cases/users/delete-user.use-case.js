import { NotFound } from "../../errors/index.js";

export class DeleteUsersUseCase {
  repository;
  constructor(repository) {
    this.repository = repository;
  }

  execute(id) {
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

    this.repository.delete(id);
  }
}
