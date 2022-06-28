import React, { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:4001"; // TODO: add .env

export const App = () => {
  const [socket, setSocket] = useState();
  const [response, setResponse] = useState("");

  useEffect(() => {
    socket?.on("init", (data) => setResponse(data));
  }, [socket]);

  const connect = () => {
    const args = {}; // TODO: database connection attributes
    socket.emit("init", args);
  };

  useEffect(() => {
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div className="App">
      <button onClick={connect}>connect</button>
      <p>{response}</p>
    </div>
  );
};
