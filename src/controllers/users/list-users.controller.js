import { ListUsersUseCase } from "../../use-cases/users/list-users.use-case.js";

export class ListUsersController {
  repository;
  constructor(repository) {
    this.repository = repository;
  }
  handler(request, response) {
    const { search } = request.query;
    const filter = search ? { name: search, email: search } : null;
    const listUserUseCase = new ListUsersUseCase(this.repository);
    const users = listUserUseCase.execute(filter);
    return response.writeHead(200).end(JSON.stringify(users));
  }
}
