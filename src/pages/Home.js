import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";

import { useSocketContext } from "../hooks/useSocketContext";
import { getConfigFormat } from "./utils";

const FIELDS = {
  postgres: [
    { label: "Host", name: "host", placeholder: "localhost" },
    { label: "Port", name: "port", placeholder: "5432" },
    { label: "User", name: "user", placeholder: "root" },
    { label: "Password", name: "password", placeholder: "1234" },
    { label: "Database Name", name: "database" },
  ],
  arango: [
    { label: "Url", name: "url" },
    { label: "Username", name: "user" },
    { label: "Password", name: "password" },
    { label: "Database Name", name: "databaseName" },
  ],
};

export const Home = () => {
  const [response, setResponse] = useState("");
  const { socket } = useSocketContext();

  useEffect(() => {
    socket?.on("init", (data) => setResponse(data));
  }, [socket]);

  const onSubmit = (data) => {
    const { postgresConfig, arangoConfig } = getConfigFormat(data);
    socket.emit("init", postgresConfig, arangoConfig);
  };

  return (
    <div className="app">
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            className="d-flex flex-column align-items-center"
          >
            <div className="row justify-content-center mb-5">
              <div className="col-4 me-2">
                <h4>Postgres connection data:</h4>

                {FIELDS.postgres.map(({ label, name, placeholder }) => (
                  <>
                    <label>{label}</label>
                    <Field
                      name={`pg-${name}`}
                      component="input"
                      placeholder={placeholder}
                    />
                  </>
                ))}
              </div>

              <div className="col-4 ms-2">
                <h4>Arango connection data:</h4>

                {FIELDS.arango.map(({ label, name, placeholder }) => (
                  <>
                    <label>{label}</label>
                    <Field
                      name={`pg-${name}`}
                      component="input"
                      placeholder={placeholder}
                    />
                  </>
                ))}
              </div>
            </div>

            <button type="submit" className="text-align-center">
              Try connection
            </button>
          </form>
        )}
      />
      <span className="mt-4 fs-6">{response}</span>
    </div>
  );
};
