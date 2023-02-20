import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { SocketContextProvider } from './hooks/useSocketContext';
import { Preview, Migrate, Home } from './pages';

import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.scss';
import { ConsoleContextProvider } from './hooks/useConsoleContext';
import { MainLayout } from './layouts';

export const App = () => (
  <ConsoleContextProvider>
    <SocketContextProvider>
      <MainLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/migrate" element={<Migrate />} />
        </Routes>
      </BrowserRouter>
      </MainLayout>
    </SocketContextProvider>
  </ConsoleContextProvider>
);
