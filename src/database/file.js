import fs from "node:fs/promises";

const databasePath = new URL("../../db.json", import.meta.url);

export class Database {
  database = {};

  constructor() {
    this.#populate();
  }

  persist() {
    fs.writeFile(databasePath, JSON.stringify(this.database));
  }

  #populate() {
    fs.readFile(databasePath, "utf8")
      .then((data) => (this.database = JSON.parse(data)))
      .catch(() => this.persist());
  }
}
