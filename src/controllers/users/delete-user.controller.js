import { DeleteUsersUseCase } from "../../use-cases/users/delete-user.use-case.js";

export class DeleteUsersController {
  repository;
  constructor(repository) {
    this.repository = repository;
  }
  handler(request, response) {
    try {
      const { id } = request.params;
      const deleteUserUseCase = new DeleteUsersUseCase(this.repository);
      deleteUserUseCase.execute(id);
      return response.writeHead(204).end();
    } catch (error) {
      return response.writeHead(error.statusCode).end(error.message);
    }
  }
}
