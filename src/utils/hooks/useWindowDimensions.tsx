import React from 'react';

export function useWindowDimensions() {
  const [windowWidth, setWindowWidth] = React.useState(0);
  const [windowHeight, setWindowHeight] = React.useState(0);

  function handleResize(e: Event) {
    const target = e.target as Window;
    setWindowWidth(target.innerWidth);
    setWindowHeight(target.innerHeight);
  }

  React.useEffect(() => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
  }, []);

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { windowWidth, windowHeight };
}
