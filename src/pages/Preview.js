import React, { useEffect, useState } from 'react';
import Graph from 'react-graph-vis';
import { useNavigate } from 'react-router-dom';

import { useSocketContext } from '../hooks/useSocketContext';
import { Breadcrumb, STEPS } from '../components/Breadcrumb';
import { useToast, TOAST_TYPES } from '../hooks/useToast';
import { paths } from './paths';

export const Preview = () => {
  const [graph, setGraph] = useState();
  const [previewOn, setPreviewOn] = useState(false);
  const [loading, setLoading] = useState(false);

  const { socket } = useSocketContext();
  const navigate = useNavigate();

  const { showToast } = useToast();

  useEffect(() => {
    socket?.on('preview', (message, data) => {
      setGraph(data);
      setLoading(false);
      if (message === 'error') {
        navigate(paths.connection);

        showToast({
          message: 'Connection fail, please init the connection again.',
          type: TOAST_TYPES.error,
        });
      }
    });
  }, [socket]);

  const handlePreview = () => {
    setPreviewOn(true);
    setLoading(true);

    socket.emit('preview');
  };

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: 'black',
    },
    nodes: {
      color: '#a2cfcf',
      borderWidth: 2,
    },
    interaction: { hoverEdges: true },
  };

  //console.log(graph);

  return (
    <div className='app h-100'>
      <div className='connection-container'>
        <Breadcrumb active={STEPS.preview} />
        <div className='separator' />

        <h2>Preview the schema graph</h2>
        <p>
          Have a quick look of how your relational database will look when
          migrated to a graph in ArangoDB
        </p>
        {!previewOn && (
          <div className='d-flex justify-content-center my-5'>
            <button className='big-button' onClick={handlePreview}>
              <img height='60' src='/images/networking.png' alt='' />
              <span className='mx-2'>Generate Preview</span>
            </button>

            <button
              className='big-button'
              onClick={() => navigate(paths.migrate)}
            >
              <img height='60' src='/images/migrate.png' alt='' />
              <span className='mx-2'>Skip to Migration</span>
            </button>
          </div>
        )}
        {previewOn && (
          <div>
            {loading && <div className='spinner-border' role='status' />}

            {!!graph && (
              <Graph
                graph={graph}
                options={options}
                style={{ height: '640px' }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
