import React from 'react';

export function useWindowDimensions() {
  const [windowWidth, setWindowWidth] = React.useState(0);
  const [windowHeight, setWindowHeight] = React.useState(0);

  const isClient = typeof window !== 'undefined';

  React.useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isClient]);

  return { windowWidth, windowHeight };
}
