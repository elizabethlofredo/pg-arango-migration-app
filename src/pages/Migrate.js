import { useEffect, useState } from 'react';

import { Console } from '../components';
import { useConsoleContext } from '../hooks/useConsoleContext';
import { useSocketContext } from '../hooks/useSocketContext';
import { useToast, TOAST_TYPES } from '../hooks/useToast';
import { Breadcrumb, STEPS } from '../components/Breadcrumb';

export const Migrate = () => {
  const { socket } = useSocketContext();
  const { messages, clearMessages } = useConsoleContext();

  const [done, setDone] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    socket?.on('migrate', (status) => {
      if (status === 'success') {
        setDone(true);
        showToast({ message: 'Migration complete.' });
      } else {
        showToast({
          messages: 'Migration failed, please check the logs.',
          type: TOAST_TYPES.error,
        });
      }
    });

    showToast({ message: 'Migration started!' });
    socket?.emit('migrate');
  }, [socket]);

  return (
    <div className='connection-container'>
      <Breadcrumb active={STEPS.migrate} />
      <div className='separator' />

      {done ? (
        <div className='text-center col-6 mx-auto mb-5'>
          <img height='150' src='/images/check.svg' alt='' />
          <h2 className='mt-2'>Successfully migrated</h2>
          <p>
            The migration is complete. You can now go to ArangoDB and check your
            new graph database.
          </p>
        </div>
      ) : (
        <>
          <h2>Migration</h2>
          <p>
            The migration has started, you can see the progress in the following
            logs.
          </p>
        </>
      )}

      <>
        <div className='row'>
          <Console messages={messages} className='logs' />

          <button
            className='secondary-button col-2 mt-3 mx-auto'
            onClick={clearMessages}
          >
            Clear logs
          </button>
        </div>
      </>
    </div>
  );
};
