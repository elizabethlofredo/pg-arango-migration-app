import React, { useEffect, useState } from "react";
import Graph from "react-graph-vis";

import { useSocketContext } from "../hooks/useSocketContext";

export const Preview = () => {
  const [message, setMessage] = useState("");
  const [graph, setGraph] = useState("");
  const { socket } = useSocketContext();

  useEffect(() => {
    socket?.on("preview", (message, data) => {
      setGraph(data);
      setMessage(message);
    });
  }, [socket]);

  const handlePreview = () => {
    setMessage("Loading..");
    socket.emit("preview");
  };

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: "white",
    },
    nodes: {
      color: "#a2cfcf",
      borderWidth: 2,
    },
    interaction: { hoverEdges: true },
  };

  return (
    <div className="app">
      <button className="text-align-center" onClick={handlePreview}>
        Preview database
      </button>
      {message}
      {graph && (
        <Graph graph={graph} options={options} style={{ height: "640px" }} />
      )}
    </div>
  );
};
