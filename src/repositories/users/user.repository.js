import { randomUUID } from "node:crypto";

export class UserRepository {
  dbConnection;
  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  select(search) {
    let data = this.dbConnection.database.users || [];

    if (search) {
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) =>
          row[key].toLowerCase().includes(value.toLowerCase())
        );
      });
    }
    return data;
  }

  insert(data) {
    const insertable = {
      id: randomUUID(),
      ...data,
    };

    if (!Array.isArray(this.dbConnection.database.users)) {
      this.dbConnection.database.users = [insertable];
    } else {
      this.dbConnection.database.users.push(insertable);
    }

    this.dbConnection.persist();
    return insertable;
  }

  update(id, user) {
    const rowIndex = this.dbConnection.database.users.findIndex(
      (row) => row.id === id
    );

    if (rowIndex > -1) {
      this.dbConnection.database.users[rowIndex] = { ...user };
      this.dbConnection.persist();
    }
  }

  findOne({ searchableKey, searchableValue }) {
    if (!Array.isArray(this.dbConnection.database.users)) return null;
    const data = this.dbConnection.database.users.find(
      (item) => item[searchableKey] === searchableValue
    );
    return data;
  }

  delete(id) {
    const rowIndex = this.dbConnection.database.users.findIndex(
      (row) => row.id === id
    );

    if (rowIndex > -1) {
      this.dbConnection.database.users.splice(rowIndex, 1);
      this.dbConnection.persist();
    }
  }
}
