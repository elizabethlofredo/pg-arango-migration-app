import { createContext, useContext, useState } from 'react';

const ConsoleContext = createContext();

const MAX_MESSAGES = 120;

export const ConsoleContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const pushMessage = (message) =>
    setMessages((messages) => [...messages, message].splice(-MAX_MESSAGES));

  const clearMessages = () => setMessages([]);

  return (
    <ConsoleContext.Provider value={{ messages, pushMessage, clearMessages }}>
      {children}
    </ConsoleContext.Provider>
  );
};

export const useConsoleContext = () => useContext(ConsoleContext);
