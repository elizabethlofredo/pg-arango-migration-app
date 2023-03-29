export const CONNECTION_FIELDS = {
  postgres: [
    {
      label: 'Host',
      name: 'pg-host',
      props: { required: true },
    },
    {
      label: 'Port',
      name: 'pg-port',
      props: { required: true },
    },
    {
      label: 'User',
      name: 'pg-user',
      props: { required: true },
    },
    {
      label: 'Password',
      name: 'pg-password',
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
      props: { required: true },
    },
    {
      label: 'Password',
      name: 'arango-password',

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

export const ERROR_MESSAGES = {
  required: 'This field is required',
};
