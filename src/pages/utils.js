export const getConfigFormat = (data) => {
  const postgresConfig = {
    host: data[`pg-host`],
    port: data[`pg-port`],
    user: data[`pg-user`],
    password: data[`pg-password`],
    database: data[`pg-database`],
  };

  const arangoConfig = {
    databaseName: data[`arango-database`],
    url: data[`arango-url`],
    auth: {
      username: data[`arango-user`],
      password: data[`arango-password`],
    },
  };

  return { postgresConfig, arangoConfig };
};
