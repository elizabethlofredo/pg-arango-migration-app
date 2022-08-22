import React, { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import { Console } from '../components';
import { useConsoleContext } from '../hooks/useConsoleContext';

import { useSocketContext } from '../hooks/useSocketContext';
import { HorizontalLayout } from '../layouts';
import { getConfigFormat } from './utils';

const FIELDS = {
  postgres: [
    { label: 'Host', name: 'pg-host', placeholder: 'localhost' },
    { label: 'Port', name: 'pg-port', placeholder: '5432' },
    { label: 'User', name: 'pg-user', placeholder: 'postgres' },
    { label: 'Password', name: 'pg-password', placeholder: '1234' },
    { label: 'Database Name', name: 'pg-database' },
  ],
  arango: [
    { label: 'URL', name: 'arango-url' },
    { label: 'Username', name: 'arango-user', placeholder: 'postgres' },
    { label: 'Password', name: 'arango-password', placeholder: '1234' },
    { label: 'Database Name', name: 'arango-database' },
  ],
};

export const Home = () => {
  const { socket } = useSocketContext();
  const { messages } = useConsoleContext();
  const [credentialsValid, setCredentialsValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket?.on('init', (status, data) => {
      if (status === 'success') {
        setCredentialsValid(true);
      } else {
        setCredentialsValid(false);
        console.error(data);
      }
    });
  }, [socket]);

  const onSubmit = (data) => {
    const config = getConfigFormat(data);
    socket.emit('init', config);
  };

  return (
    <HorizontalLayout>
      <div className="app">
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, pristine }) => (
            <form
              onSubmit={handleSubmit}
              className="d-flex flex-column align-items-center"
            >
              <div className="row justify-content-center mb-5">
                <div className="col-4 me-2">
                  <h4>Postgres connection data:</h4>

                  {FIELDS.postgres.map(({ label, name, placeholder }) => (
                    <React.Fragment key={name}>
                      <label>{label}</label>
                      <Field
                        name={name}
                        component="input"
                        placeholder={placeholder}
                      />
                    </React.Fragment>
                  ))}
                </div>

                <div className="col-4 ms-2">
                  <h4>Arango connection data:</h4>

                  {FIELDS.arango.map(({ label, name, placeholder }) => (
                    <React.Fragment key={name}>
                      <label>{label}</label>
                      <Field
                        name={name}
                        component="input"
                        placeholder={placeholder}
                      />
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="d-flex flex-column gap-4">
                <button
                  type="submit"
                  className="text-align-center"
                  disabled={pristine}
                >
                  Test connection
                </button>

                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="text-align-center"
                    disabled={!credentialsValid}
                    onClick={() => navigate('/migrate')}
                  >
                    Migrate database
                  </button>

                  <button
                    type="button"
                    className="text-align-center"
                    disabled={!credentialsValid}
                  >
                    Preview graph
                  </button>
                </div>
              </div>
            </form>
          )}
        />
      </div>
      <Console messages={messages} />
    </HorizontalLayout>
  );
};
