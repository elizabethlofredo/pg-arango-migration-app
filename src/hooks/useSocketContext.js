import React, { useState, useEffect, createContext, useContext } from 'react';
import io from 'socket.io-client';
import { useConsoleContext } from './useConsoleContext';

const ENDPOINT = 'http://127.0.0.1:4001'; // TODO: add .env

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const { pushMessage } = useConsoleContext();

  useEffect(() => {
    const newSocket = io(ENDPOINT);
    newSocket.on('data', (message) => pushMessage(message));
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
