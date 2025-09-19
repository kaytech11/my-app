// server.js
import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("db.json"); // your data
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server running on port ${PORT}`);
});
