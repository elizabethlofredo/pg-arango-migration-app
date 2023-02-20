import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Console } from '../components';
import { useConsoleContext } from '../hooks/useConsoleContext';
import { useSocketContext } from '../hooks/useSocketContext';
import { Link } from 'react-router-dom';

export const Migrate = () => {
  const { socket } = useSocketContext();
  const { messages, clearMessages } = useConsoleContext();

  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const [migrating, setMigrating] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState();

  useEffect(() => {
    socket?.on('migrate', (status, data) => {
      setMigrating(false);
      setShowToast(true);
      if (status === 'success') {
        setDone(true);
        setToastMessage('Migration complete.');
      } else {
        setError(true);
        setToastMessage('Migration failed. Please check the logs...');
      }
    });
  }, [socket]);

  const startMigration = () => {
    setMigrating(true);
    setShowToast(true);
    setToastMessage('Migration started. Please wait...');
    socket.emit('migrate');
  };

  return (
    <div className="app h-100">
      <div className="w-100 h-75 gap-4 d-flex flex-column justify-content-center align-items-center">
        <h3>Database migration</h3>

        <div className="w-50 d-flex flex-column">
          <div className="d-flex justify-content-between">
            <Link to="/" className="link">
              Go back
            </Link>
            <button className="link ml-auto" onClick={clearMessages}>
              Clear log
            </button>
          </div>
          <Console className="w-50 h-30" messages={messages} />
        </div>

        <div
          className={classNames(
            'alert',
            done && 'alert-success',
            error && 'alert-danger',
            migrating && 'alert-info',
            !showToast && 'hidden'
          )}
          role="alert"
        >
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowToast(false)}
          ></button>
          {toastMessage}
        </div>

        <button disabled={migrating || done} onClick={startMigration}>
          Start migration
        </button>
      </div>
    </div>
  );
};
