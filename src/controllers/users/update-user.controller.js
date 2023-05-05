import { UpdateUsersUseCase } from "../../use-cases/users/update-user.use-case.js";

export class UpdateUsersController {
  repository;
  constructor(repository) {
    this.repository = repository;
  }
  handler(request, response) {
    try {
      const { id } = request.params;
      const { name, email } = request.body;
      const updateUserUseCase = new UpdateUsersUseCase(this.repository);
      updateUserUseCase.execute(id, { name, email });
      return response.writeHead(204).end();
    } catch (error) {
      return response.writeHead(error.statusCode || 500).end(error.message);
    }
  }
}
