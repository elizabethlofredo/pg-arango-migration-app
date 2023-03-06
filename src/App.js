import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { SocketContextProvider } from './hooks/useSocketContext';
import { ToastContextProvider } from './hooks/useToast';
import { ConsoleContextProvider } from './hooks/useConsoleContext';
import { Preview, Migrate, Home, paths } from './pages';

import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.scss';
import { MainLayout } from './layouts';

export const App = () => (
  <ConsoleContextProvider>
    <SocketContextProvider>
      <ToastContextProvider>
        <MainLayout>
          <BrowserRouter>
            <Routes>
              <Route path={paths.connection} element={<Home />} />
              <Route path={paths.preview} element={<Preview />} />
              <Route path={paths.migrate} element={<Migrate />} />
            </Routes>
          </BrowserRouter>
        </MainLayout>
      </ToastContextProvider>
    </SocketContextProvider>
  </ConsoleContextProvider>
);
