import React from 'react';
import styled from 'styled-components';
import { useIntroContext } from '../contexts/introContext';
import preventScroll from '../utils/preventScroll';

type AnimatedIntroProps = {
  hasSeenIntro: boolean;
  shouldRemoveElement: boolean;
};

const AnimatedIntroPage = styled.div<AnimatedIntroProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: grey;
  z-index: 200;
  opacity: ${(props) => (props.hasSeenIntro ? '0' : '1')};
  transition: opacity 2.5s linear; // may need to adjust this timer, this will be how long the transition will take ONCE the animation is done itself
  display: ${(props) => (props.shouldRemoveElement ? 'none' : 'block')};
`;

const AnimatedIntro = () => {
  const [shouldRemoveElement, setShouldRemoveElement] = React.useState(false);
  const { hasMounted, hasSeenIntro, setHasSeenIntro } = useIntroContext();

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (hasMounted) {
        console.log('hasMounted');
        setHasSeenIntro(true);
      }
    }, 2000); // may need to adjust this timer, this will be the actual time it takes to run the animation

    return () => clearTimeout(timeout);
  }, [hasMounted]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (hasSeenIntro) {
        console.log('hasSeenIntro');
        setShouldRemoveElement(true);
        preventScroll(false);
      }
    }, 2750); // may need to adjust this timer, this will be how long we want to wait before removing the element from the DOM, need to wait until opacity transition is done, WAIT for the AT LEAST the lenght of the opacity transition

    return () => clearTimeout(timeout);
  }, [hasSeenIntro]);

  return (
    <AnimatedIntroPage
      hasSeenIntro={hasSeenIntro}
      shouldRemoveElement={shouldRemoveElement}
    ></AnimatedIntroPage>
  );
};

export default AnimatedIntro;
