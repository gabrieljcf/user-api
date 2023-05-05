import { BadRequest, Conflict } from "../../errors/index.js";

export class CreateUserUseCase {
  repository;
  constructor(repository) {
    this.repository = repository;
  }

  execute({ name, email }) {
    if (!name) {
      throw new BadRequest({
        error: "Bad request",
        name: "required",
        message: "Name is required",
      });
    }

    if (!email) {
      throw new BadRequest({
        error: "Bad request",
        email: "required",
        message: "Email is required",
      });
    }

    const emailExists = this.repository.findOne({
      searchableKey: "email",
      searchableValue: email,
    });

    if (emailExists) {
      throw new Conflict({
        error: "Conflict",
        email: "exists",
        message: "Email is already exists",
      });
    }

    const user = {
      name,
      email,
    };

    const data = this.repository.insert(user);
    return data;
  }
}
