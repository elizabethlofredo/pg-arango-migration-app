import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { SocketContextProvider } from "./hooks/useSocketContext";
import { Home, Preview, Migrate } from "./pages";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

export const App = () => (
  <SocketContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/migrate" element={<Migrate />} />
      </Routes>
    </BrowserRouter>
  </SocketContextProvider>
);
