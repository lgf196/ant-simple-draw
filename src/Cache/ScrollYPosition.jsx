import React, { useContext, createContext, useState } from 'react';

const ScrollYPositionContext = createContext();

export const ScrollYPosition = ({ children }) => {
  const [scrollYPositions, setScrollYPositions] = useState({});

  const setScrollYPosition = (pathname, scrollY) => {
    setScrollYPositions((prevScrollYPositions) => ({
      ...prevScrollYPositions,
      [pathname]: { scrollY },
    }));
  };

  const getScrollYPosition = (pathname) => {
    if (!scrollYPositions[pathname]) {
      setScrollYPosition(pathname, 0);
      return 0;
    }
    return scrollYPositions[pathname].scrollY;
  };

  return (
    <ScrollYPositionContext.Provider
      value={{
        setScrollYPosition,
        getScrollYPosition,
      }}
    >
      {children}
    </ScrollYPositionContext.Provider>
  );
};

export const useScrollYPosition = () => useContext(ScrollYPositionContext);
