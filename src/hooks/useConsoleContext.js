import { createContext, useContext, useState } from 'react';

const ConsoleContext = createContext();

const MAX_MESSAGES = 120;

export const ConsoleContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const pushMessage = (message) => {
    setMessages(messages => [...messages, message].splice(-MAX_MESSAGES));
  };

  return (
    <ConsoleContext.Provider value={{ messages, pushMessage }}>
      {children}
    </ConsoleContext.Provider>
  );
};

export const useConsoleContext = () => useContext(ConsoleContext);
