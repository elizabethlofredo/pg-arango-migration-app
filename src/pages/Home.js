import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { useNavigate } from "react-router-dom";

import { useSocketContext } from "../hooks/useSocketContext";
import { getConfigFormat } from "./utils";

const FIELDS = {
  postgres: [
    { label: "Host", name: "pg-host", placeholder: "localhost" },
    { label: "Port", name: "pg-port", placeholder: "5432" },
    { label: "User", name: "pg-user", placeholder: "postgres" },
    { label: "Password", name: "pg-password", placeholder: "1234" },
    { label: "Database Name", name: "pg-database" },
  ],
  arango: [
    { label: "URL", name: "arango-url" },
    { label: "Username", name: "arango-user", placeholder: "postgres" },
    { label: "Password", name: "arango-password", placeholder: "1234" },
    { label: "Database Name", name: "arango-database" },
  ],
};

export const Home = () => {
  const [response, setResponse] = useState("");
  const { socket } = useSocketContext();
  const navigate = useNavigate();

  useEffect(() => {
    socket?.on("init", (data) => setResponse(data));
  }, [socket]);

  const onSubmit = (data) => {
    /*  Uncomment to test  
      const postgresConfig = {
      host: "localhost",
      port: "5432",
      user: "postgres",
      password: "1234",
      database: "dvdrental",
    };

    const arangoConfig = {
      databaseName: "dvdrental",
      url: "https://8375-186-50-37-127.sa.ngrok.io/",
      auth: {
        username: "root",
        password: "1234",
      },
    };*/

    setResponse("Loading...");
    const config = getConfigFormat(data);
    socket.emit("init", config);
  };

  return (
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
                  <>
                    <label>{label}</label>
                    <Field
                      name={name}
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
                      name={name}
                      component="input"
                      placeholder={placeholder}
                    />
                  </>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="text-align-center"
              disabled={pristine}
            >
              Try connection
            </button>
          </form>
        )}
      />
      <span className="mt-4 fs-6">{response}</span>
      <button onClick={() => navigate("/preview")}>Go to preview</button>
    </div>
  );
};
