import appModulePath from "app-module-path";
import http from "http";
import express from "express";
import cors from "cors";

import Transform from "pg-arango-transform";
import { Server } from "socket.io";

appModulePath.addPath(`${__dirname}`);

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  const transform = new Transform();

  // Establishes the connection to the Postgres database and the Arango database.
  socket.on("init", async (arg) => {
    const { postgresConfig, arangoConfig } = arg;

    try {
      await transform.init(postgresConfig, arangoConfig);
      socket.emit("init", "Connection success");
    } catch (error) {
      socket.emit("init", error.message);
    }
  });

  // Returns an object that represents the preview graph.
  socket.on("preview”", () => {});

  //Migrates the Postgres database to the Arango database.
  socket.on("migrate”", () => {});

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen("4001", () => console.log(`Listening on port 4001`));
