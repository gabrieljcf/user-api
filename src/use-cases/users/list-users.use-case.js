export class ListUsersUseCase {
  repository;
  constructor(repository) {
    this.repository = repository;
  }

  execute(filter) {
    const users = this.repository.select(filter);
    return users;
  }
}
