import React, { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useNavigate } from 'react-router-dom';

import { useConsoleContext } from '../hooks/useConsoleContext';
import { useSocketContext } from '../hooks/useSocketContext';
import { useToast, TOAST_TYPES } from '../hooks/useToast';
import { Breadcrumb, STEPS } from '../components/Breadcrumb';
import { getConfigFormat } from './utils';
import { CONNECTION_FIELDS, ERROR_MESSAGES } from './constants';
import { paths } from './paths';

const SESSION_STORAGE_CREDENTIALS_KEY = 'pg-arango-credentials';

export const Home = () => {
  const { socket } = useSocketContext();
  const { clearMessages } = useConsoleContext();
  const [initialValues] = useState(() =>
    JSON.parse(sessionStorage.getItem(SESSION_STORAGE_CREDENTIALS_KEY))
  );

  const navigate = useNavigate();

  const { showToast, clearToast } = useToast();

  useEffect(() => {
    socket?.on('init', (status, data) => {
      if (status === 'success') {
        showToast({ message: 'Connection established successfully' });
        navigate(paths.preview);
      } else {
        showToast({ message: data, type: TOAST_TYPES.error });
      }
    });
  }, [socket]);

  const onSubmit = (data) => {
    sessionStorage.setItem(
      SESSION_STORAGE_CREDENTIALS_KEY,
      JSON.stringify(data)
    );
    const config = getConfigFormat(data);
    clearMessages();
    clearToast();
    socket.emit('init', config);
  };

  const isRequired = (value) => (value ? undefined : ERROR_MESSAGES.required);

  return (
    <div>
      <div className="connection-container">
        <Breadcrumb active={STEPS.connection} />
        <div className="separator" />
        <Form
          initialValues={initialValues}
          onSubmit={onSubmit}
          render={({ handleSubmit, modifiedSinceLastSubmit }) => (
            <form onSubmit={handleSubmit} className="d-flex flex-column">
              <div>
                <div>
                  <h2>PostgresSQL connection data:</h2>
                  <p>
                    The following information is needed in order to connect with
                    the PostgresSQL database.
                  </p>

                  <div className="connection-fields row">
                    {CONNECTION_FIELDS.postgres.map(
                      ({ label, name, props: { required, ...props } = {} }) => (
                        <React.Fragment key={name}>
                          <Field name={name} validate={required && isRequired}>
                            {({ input, meta }) => (
                              <div className="col-6">
                                <div className="d-flex flex-column">
                                  <label>
                                    {required && <span>*</span>}
                                    {label}
                                  </label>
                                  <input {...props} {...input} />

                                  {meta.error && meta.touched && (
                                    <span className="error">{meta.error}</span>
                                  )}
                                </div>
                              </div>
                            )}
                          </Field>
                        </React.Fragment>
                      )
                    )}
                  </div>
                </div>

                <div className="mt-5">
                  <h2>ArangoDB connection data:</h2>
                  <p>
                    The following information is needed in order to connect with
                    the ArangoDB database. <br />
                    <strong>
                      Be aware that the creation of the database in the ArangoDB
                      dashboard is needed before starting the migration.
                    </strong>
                  </p>

                  <div className="connection-fields row">
                    {CONNECTION_FIELDS.arango.map(
                      ({ label, name, props: { required, ...props } = {} }) => (
                        <React.Fragment key={name}>
                          <Field
                            name={name}
                            className="arango"
                            validate={required && isRequired}
                          >
                            {({ input, meta }) => (
                              <div className="col-6">
                                <div className="d-flex flex-column">
                                  <label>
                                    {required && <span>*</span>}
                                    {label}
                                  </label>
                                  <input {...props} {...input} />
                                  {meta.error && meta.touched && (
                                    <span className="error">{meta.error}</span>
                                  )}
                                </div>
                              </div>
                            )}
                          </Field>
                        </React.Fragment>
                      )
                    )}
                  </div>
                </div>

                <div className="mt-5 d-flex justify-content-between align-items-start">
                  <span>* Required fields.</span>
                  <button className="primary-button" type="submit">
                    Connect
                  </button>
                </div>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
};
