import React from 'react';
import styled from 'styled-components';
import { useIntroContext } from '../contexts/introContext';
import preventScroll from '../utils/preventScroll';
import theme from '../styles/theme';

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

const AnimationContainer = styled.section`
  overflow: hidden;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Header = styled.h1`
  margin: 0;
  padding: 0;
  text-align: center;
  color: white;
  font-size: 5em;
  font-family: ${theme.fonts.robotoMono};
  text-transform: uppercase;
`;

const StyledSpan = styled.span`
  display: inline-block;
  color: white;
  /* enter */
  @keyframes animateLetter {
    0% {
      opacity: 0;
      transform: rotateY(90deg);
      filter: blur(10px);
    }
    100% {
      opacity: 1;
      transform: rotateY(0deg);
      filter: blur(0px);
    }
  }
  /* leave */
  @keyframes smokeAnimation {
    0% {
      transform: none;
      filter: blur(0px);
      text-shadow: none;
      opacity: 1;
    }
    25% {
      text-shadow: -25px -15px 20px grey;
    }
    50% {
      transform: scale(1.5) translate(-50px, -50px) rotate(-45deg);
      filter: blur(9px);
      text-shadow: none;
    }
    100% {
      transform: scale(3) translate(-100px, -100px) rotate(-90deg);
      filter: blur(17px);
      text-shadow: none;
      color: transparent;
      opacity: 0;
    }
  }

  animation-name: animateLetter, smokeAnimation;
  animation-duration: 1.2s, 2.5s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;

  &:nth-child(1) {
    color: ${theme.colors.BLUE_1};
    opacity: 0;
    animation-delay: 1s, 2.2s;
  }
  &:nth-child(2) {
    opacity: 0;
    animation-delay: 1.25s, 2.45s;
  }
  &:nth-child(3) {
    opacity: 0;
    animation-delay: 1.5s, 2.7s;
  }
  &:nth-child(4) {
    opacity: 0;
    animation-delay: 1.75s, 2.95s;
  }
  &:nth-child(5) {
    opacity: 0;
    animation-delay: 2s, 3.2s;
  }
  &:nth-child(6) {
    opacity: 0;
    animation-delay: 2.25s, 3.45s;
  }
  &:nth-child(7) {
    opacity: 0;
    animation-delay: 2.5s, 3.7s;
  }
`;

const StyledSpan2 = styled.span`
  display: inline-block;
  animation: smokeAnimation 2.5s linear forwards;
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
    }, 5000); // may need to adjust this timer, this will be the actual time it takes to run the animation

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

  const SPAN_DATA = [
    {
      id: 1,
      letter: 'W',
    },
  ];

  return (
    <AnimatedIntroPage
      hasSeenIntro={hasSeenIntro}
      shouldRemoveElement={shouldRemoveElement}
    >
      <AnimationContainer>
        <Header>
          <StyledSpan>W</StyledSpan>
          <StyledSpan>e</StyledSpan>
          <StyledSpan>l</StyledSpan>
          <StyledSpan>c</StyledSpan>
          <StyledSpan>o</StyledSpan>
          <StyledSpan>m</StyledSpan>
          <StyledSpan>e</StyledSpan>
        </Header>
      </AnimationContainer>
    </AnimatedIntroPage>
  );
};

export default AnimatedIntro;
