import "reflect-metadata";

import * as express from "express";
import { createServer } from "http";

import { applyApolloMiddleware } from "./apollo";
import { createConnection } from "typeorm";
import { applyAuthMiddleware } from "./user/user.middleware";

const PORT = parseInt(process.env.PORT || "4000");

export async function start() {
  console.time("server_startup");

  const app = express();
  const server = createServer(app);

  await createConnection({
    type: "postgres",
    entities: [`${__dirname}/**/*.model.*s`],
    synchronize: true,
    url: process.env.DATABASE_URL
  });

  applyAuthMiddleware(app);
  applyApolloMiddleware(app);

  await new Promise(r => server.listen(PORT, r));
  console.timeEnd("server_startup");
}
