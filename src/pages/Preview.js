import React, { useEffect, useState } from "react";
import Graph from "react-graph-vis";
import { Link } from "react-router-dom";

import { useSocketContext } from "../hooks/useSocketContext";

export const Preview = () => {
  const [graph, setGraph] = useState();
  const { socket } = useSocketContext();

  useEffect(() => {
    socket?.on("preview", (_message, data) => {
      setGraph(data);
    });
    socket.emit("preview");
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
      color: "black",
    },
    nodes: {
      color: "#a2cfcf",
      borderWidth: 2,
    },
    interaction: { hoverEdges: true },
  };

  return (
    <div className="app h-100">
      <Link to="/" className="link">
        Go back
      </Link>
      {graph && (
        <Graph graph={graph} options={options} style={{ height: '640px' }} />
      )}
    </div>
  );
};
