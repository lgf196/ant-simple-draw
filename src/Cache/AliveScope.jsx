import React, { useContext, createContext, useState } from 'react';
import ReactDOM from 'react-dom';

const AliveScopeContext = createContext();

export const AliveScope = ({ children }) => {
  const [nodes, setNodes] = useState({});

  const getPortalElement = (id, children) => {
    if (!nodes[id]) {
      const element = document.createElement('div');
      setNodes((prevNodes) => ({
        ...prevNodes,
        [id]: { children, element },
      }));
      return element;
    }
    return nodes[id].element;
  };

  return (
    <AliveScopeContext.Provider
      value={{
        getPortalElement,
      }}
    >
      {children}
      {Object.entries(nodes).map(([id, { children, element }]) => (
        <React.Fragment key={id}>{ReactDOM.createPortal(children, element)}</React.Fragment>
      ))}
    </AliveScopeContext.Provider>
  );
};

export const useAliveScope = () => useContext(AliveScopeContext);
