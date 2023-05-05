import http from "node:http";
import { json } from "./src/middlewares/json.js";
import { router } from "./src/middlewares/router.js";

const server = http.createServer(async (request, response) => {
  await json(request, response);
  router(request, response)
});

server.listen(3333, () => {
  console.log("Server started on port 3333");
});
