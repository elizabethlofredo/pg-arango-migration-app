import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Form, Field } from 'react-final-form';
import { Link, useNavigate } from 'react-router-dom';
import { useConsoleContext } from '../hooks/useConsoleContext';

import { useSocketContext } from '../hooks/useSocketContext';
import { getConfigFormat } from './utils';

const FIELDS = {
  postgres: [
    {
      label: 'Host',
      name: 'pg-host',
      placeholder: 'localhost',
      props: { required: true },
    },
    {
      label: 'Port',
      name: 'pg-port',
      placeholder: '5432',
      props: { required: true },
    },
    {
      label: 'User',
      name: 'pg-user',
      placeholder: 'postgres',
      props: { required: true },
    },
    {
      label: 'Password',
      name: 'pg-password',
      placeholder: '1234',
      props: {
        type: 'password',
      },
    },
    { label: 'Database Name', name: 'pg-database', props: { required: true } },
  ],
  arango: [
    { label: 'URL', name: 'arango-url', props: { required: true } },
    {
      label: 'Username',
      name: 'arango-user',
      placeholder: 'postgres',
      props: { required: true },
    },
    {
      label: 'Password',
      name: 'arango-password',
      placeholder: '1234',
      props: {
        type: 'password',
      },
    },
    {
      label: 'Database Name',
      name: 'arango-database',
      props: { required: true },
    },
  ],
};

const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
};

const validateForm = (values) => {
  const errors = {};
  if (!values['pg-host']) {
    errors['pg-host'] = ERROR_MESSAGES.REQUIRED;
  }
  if (!values['pg-port']) {
    errors['pg-port'] = ERROR_MESSAGES.REQUIRED;
  }
  if (!values['pg-user']) {
    errors['pg-user'] = ERROR_MESSAGES.REQUIRED;
  }
  if (!values['pg-database']) {
    errors['pg-database'] = ERROR_MESSAGES.REQUIRED;
  }

  if (!values['arango-url']) {
    errors['arango-url'] = ERROR_MESSAGES.REQUIRED;
  }
  if (!values['arango-user']) {
    errors['arango-user'] = ERROR_MESSAGES.REQUIRED;
  }
  if (!values['arango-database']) {
    errors['arango-database'] = ERROR_MESSAGES.REQUIRED;
  }
  return errors;
};

export function Home() {
  const { socket } = useSocketContext();
  const { clearMessages } = useConsoleContext();
  const [credentialsValid, setCredentialsValid] = useState();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    socket?.on('init', (status, data) => {
      setShowToast(true);
      if (status === 'success') {
        setCredentialsValid(true);
        setToastMessage('Connection established successfully');
      } else {
        setCredentialsValid(false);
        setToastMessage(data);
      }
    });
  }, [socket]);

  const onSubmit = (data) => {
    const config = getConfigFormat(data);
    clearMessages();
    socket.emit('init', config);
  };

  return (
    <div>
      <div
        className={classNames(
          'alert',
          credentialsValid && 'alert-success',
          !credentialsValid && 'alert-danger',
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
      <Form
        onSubmit={onSubmit}
        validate={validateForm}
        render={({ handleSubmit, modifiedSinceLastSubmit }) => (
          <form
            onSubmit={handleSubmit}
            className="d-flex flex-column align-items-center"
          >
            <div className="row justify-content-center mb-5">
              <div className="col-4 me-2">
                <div className="connection-header pg">
                  <h4>Postgres connection data:</h4>
                </div>

                <div className="connection-fields">
                  {FIELDS.postgres.map(
                    ({
                      label,
                      name,
                      placeholder,
                      props: { required, ...props } = {},
                    }) => (
                      <React.Fragment key={name}>
                        <Field
                          name={name}
                          placeholder={placeholder}
                          className="pg"
                        >
                          {({ input, meta }) => (
                            <div>
                              <label required={required}>{label}</label>
                              <input
                                {...props}
                                className={classNames(
                                  meta.error && meta.submitFailed && 'error'
                                )}
                                {...input}
                              />

                              <span
                                className={classNames(
                                  'error',
                                  !(meta.error && meta.submitFailed) && 'hidden'
                                )}
                              >
                                {meta.error && meta.submitFailed ? (
                                  meta.error
                                ) : (
                                  <>pepe;</>
                                )}
                              </span>
                            </div>
                          )}
                        </Field>
                      </React.Fragment>
                    )
                  )}
                </div>
              </div>

              <div className="col-4 ms-2">
                <div className="connection-header arango">
                  <h4>Arango connection data:</h4>
                </div>

                <div className="connection-fields">
                  {FIELDS.arango.map(
                    ({
                      label,
                      name,
                      placeholder,
                      props: { required, ...props } = {},
                    }) => (
                      <React.Fragment key={name}>
                        <Field
                          name={name}
                          placeholder={placeholder}
                          className="arango"
                        >
                          {({ input, meta }) => (
                            <div>
                              <label required={required}>{label}</label>
                              <input
                                {...props}
                                className={classNames(
                                  meta.error && meta.submitFailed && 'error'
                                )}
                                {...input}
                              />

                              <span
                                className={classNames(
                                  'error',
                                  !(meta.error && meta.submitFailed) && 'hidden'
                                )}
                              >
                                {meta.error && meta.submitFailed ? (
                                  meta.error
                                ) : (
                                  <>pepe;</>
                                )}
                              </span>
                            </div>
                          )}
                        </Field>
                      </React.Fragment>
                    )
                  )}
                </div>
              </div>

              <div className="col-8 p-0 mt-5 d-flex justify-content-between">
                <button type="submit" className="text-align-center">
                  Validate connection
                </button>

                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="text-align-center"
                    disabled={!credentialsValid || modifiedSinceLastSubmit}
                    onClick={() => navigate('/migrate')}
                  >
                    Migrate database
                  </button>

                  {!credentialsValid || modifiedSinceLastSubmit ? (
                    <button
                      type="button"
                      className="text-align-center"
                      disabled
                    >
                      Preview Graph
                    </button>
                  ) : (
                    <Link
                      className="text-align-center button"
                      disabled={!credentialsValid || modifiedSinceLastSubmit}
                      to="/preview"
                    >
                      Preview graph
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </form>
        )}
      />
    </div>
  );
}
