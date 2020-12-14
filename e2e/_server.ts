import { Server } from "http";
import path from "path";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import express from "express";

export async function startServer(port = 3000): Promise<Server> {
  const app = express();
  app.use(express.static(path.join(__dirname, "../src")));
  let server: Server = null as any;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await new Promise<Server>((r) => (server = app.listen(port, r)));
  return server as Server;
}
