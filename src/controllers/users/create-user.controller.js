import { CreateUserUseCase } from "../../use-cases/users/create-user.use-case.js";

export class CreateUserController {
  repository;
  constructor(repository) {
    this.repository = repository;
  }
  handler(request, response) {
    try {
      const createUserUseCase = new CreateUserUseCase(this.repository);
      const user = createUserUseCase.execute(request.body);
      return response.writeHead(200).end(JSON.stringify(user));
    } catch (error) {
      return response.writeHead(error.statusCode).end(error.message);
    }
  }
}
