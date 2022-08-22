import appModulePath from 'app-module-path';
import http from 'http';
import express from 'express';
import cors from 'cors';

import Transform from 'pg-arango-transform';
import { Server } from 'socket.io';

appModulePath.addPath(`${__dirname}`);

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const socketActions = {
  INIT: 'init',
  PREVIEW: 'preview',
  MIGRATE: 'migrate',
};

const socketResponseTypes = {
  SUCCESS: 'success',
  ERROR: 'error',
};

io.on('connection', (socket) => {
  console.log('New client connected');

  const transform = new Transform((message) => socket.emit('data', message));

  // Establishes the connection to the Postgres database and the Arango database.
  socket.on(socketActions.INIT, async (arg) => {
    const { postgresConfig, arangoConfig } = arg;

    try {
      await transform.init(postgresConfig, arangoConfig);
      socket.emit(socketActions.INIT, socketResponseTypes.SUCCESS);
    } catch (error) {
      socket.emit(socketActions.INIT, socketResponseTypes.ERROR, error.message);
    }
  });

  // Returns an object that represents the preview graph.
  socket.on(socketActions.PREVIEW, async () => {
    try {
      const preview = await transform.getGraphPreview();
      socket.emit(socketActions.PREVIEW, socketResponseTypes.SUCCESS);
    } catch (error) {
      socket.emit(
        socketActions.PREVIEW,
        socketResponseTypes.ERROR,
        error.message
      );
    }
  });

  //Migrates the Postgres database to the Arango database.
  socket.on(socketActions.MIGRATE, async () => {
    try {
      await transform.migrate({ createGraph: true, graphName: 'test-graph' });
      socket.emit(socketActions.MIGRATE, socketResponseTypes.SUCCESS);
    } catch (error) {
      socket.emit(
        socketActions.MIGRATE,
        socketResponseTypes.ERROR,
        error.message
      );
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen('4001', () => console.log(`Listening on port 4001`));
