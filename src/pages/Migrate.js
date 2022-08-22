import { useEffect, useState } from 'react';
import { Console } from '../components';
import { useConsoleContext } from '../hooks/useConsoleContext';
import { useSocketContext } from '../hooks/useSocketContext';

export const Migrate = () => {
  const { socket } = useSocketContext();
  const { messages, pushMessage } = useConsoleContext();

  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const [migrating, setMigrating] = useState(false);

  useEffect(() => {
    socket?.on('migrate', (status, data) => {
      if (status === 'success') {
        setDone(true);
        setMigrating(false);
      } else {
        setError(true);
        setMigrating(false);
        console.error(data);
      }
    });
  }, [socket]);

  const startMigration = () => {
    setMigrating(true);
    socket.emit('migrate');
  };

  return (
    <div className="app h-100">
      <div className="w-100 h-75 gap-4 d-flex flex-column justify-content-center align-items-center">
        <h3>Database migration</h3>
        <Console className="w-50" messages={messages} />

        {done ? (
          <span>Migration completed!</span>
        ) : error ? (
          <span>Something went wrong. Please check the logs...</span>
        ) : migrating ? (
          <span>Migrating...</span>
        ) : (
          <button onClick={startMigration}>Start migration</button>
        )}
      </div>
    </div>
  );
};
