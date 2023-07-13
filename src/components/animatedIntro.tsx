import React from 'react';
import styled from 'styled-components';
import { useIntroContext } from '../contexts/introContext';
import preventScroll from '../utils/preventScroll';
import theme from '../styles/theme';
import { useDeviceContext } from '../contexts/deviceContext';
import SCREEN_SIZES from '../constants/screenSizes';
import {
  MEDIUM_WELCOME_DATA,
  SMALL_WELCOME_DATA
} from '../utils/configs/animatedIntroConfig';

type AnimatedIntroProps = {
  hasSeenIntro: boolean;
  shouldRemoveElement: boolean;
  shouldSkipIntro: boolean;
};

const AnimatedIntroPage = styled.div<AnimatedIntroProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: black;
  z-index: 200;
  opacity: ${({ hasSeenIntro, shouldSkipIntro }) => {
    if (hasSeenIntro || shouldSkipIntro) {
      return '0';
    } else {
      return '1';
    }
  }};
  transition: opacity 1s linear; // may need to adjust this timer, this will be how long the transition will take ONCE the animation is done itself
  display: ${({ shouldRemoveElement, shouldSkipIntro }) => {
    if (shouldRemoveElement || shouldSkipIntro) {
      return 'none';
    } else {
      return 'block';
    }
  }};
`;

const AnimationContainer = styled.section`
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SkipButton = styled.button`
  position: absolute;
  top: 5%;
  left: 5%;
  z-index: 300;
  outline: none;
  background: transparent;
  color: transparent;
  border: none;
  font-size: 12px;
  font-family: ${theme.fonts.robotoMono};
  height: 40px;
  width: 150px;

  &:focus {
    outline: none;
    border: 2px solid ${theme.colors.BLUE_1};
    border-radius: 12.5px;
    color: ${theme.colors.BLUE_1};
  }
`;

const FocusSkipButton = styled.button`
  position: absolute;
  top: 5%;
  left: 5%;
  z-index: 300;
  outline: none;
  background: transparent;
  color: transparent;
  border: none;
  height: 0px;
  width: 0px;

  &:focus {
    outline: none;
    border: none;
    color: transparent;
    background: transparent;
  }
`;

const Header = styled.h1`
  margin: 0;
  padding: 0;
  text-align: center;
  color: white;
  font-size: clamp(3rem, 10vw + 1rem, 6.5rem);
  font-family: ${theme.fonts.robotoMono};
  text-transform: uppercase;
`;

type StyledSpanProps = {
  dataId: number;
  delays: {
    enter: number | undefined;
    leave: number | undefined;
  };
  skip?: boolean;
  color?: string;
};

const StyledSpan = styled.span<StyledSpanProps>`
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

  ${({ dataId, delays, skip, color }) => {
    if (skip || !delays.enter || !delays.leave) {
      return ``;
    } else {
      return `
        &:nth-of-type(${dataId}) {
          color: ${color ? color : 'white'};
          opacity: 0;
          animation-delay: ${delays.enter}s, ${delays.leave}s;
        }
      `;
    }
  }}
`;

const AnimatedIntro = () => {
  const [shouldRemoveElement, setShouldRemoveElement] = React.useState(false);
  const {
    hasMounted,
    hasSeenIntro,
    setHasSeenIntro,
    shouldSkipIntro,
    setShouldSkipIntro
  } = useIntroContext();
  const { isWindowWidthAboveOrBetweenThreshold } = useDeviceContext();
  const isAboveMedium = isWindowWidthAboveOrBetweenThreshold(
    SCREEN_SIZES.MEDIUM
  );

  // HACK on first mount/page refresh, focus the invisible button
  // this then allows us the user to press tab and have the actual skip button be focused
  // otherwise it would focus the url bar and co. before going into the app itself
  React.useEffect(() => {
    const focusButton = document.getElementById('focusSkipButton');
    if (focusButton) {
      focusButton.focus();
    }
  }, []);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      // once the component is mounted, give it 7.25 seconds to run the animation
      // UNLESS the user chooses to skip the animation
      if (hasMounted && !shouldSkipIntro) {
        setHasSeenIntro(true);
      }
    }, 7250); // may need to adjust this timer, this will be the actual time it takes to run the animation BEFORE we start to fade the opacity out

    return () => clearTimeout(timeout);
  }, [hasMounted, shouldSkipIntro]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (hasSeenIntro) {
        setShouldRemoveElement(true);
        preventScroll(false);
      }
    }, 1000); // may need to adjust this timer, this will be how long we want to wait before removing the element from the DOM, need to wait until opacity transition is done, WAIT for the AT LEAST the lenght of the opacity transition

    return () => clearTimeout(timeout);
  }, [hasSeenIntro]);

  return (
    <AnimatedIntroPage
      hasSeenIntro={hasSeenIntro}
      shouldRemoveElement={shouldRemoveElement}
      shouldSkipIntro={shouldSkipIntro}
    >
      <AnimationContainer>
        {/* tabIndex set above -1 or 0 is considered an anti-pattern */}
        {/* however I feel comfortable setting here in the temporarily rendered animated intro */}
        <FocusSkipButton id="focusSkipButton" tabIndex={1} />
        <SkipButton
          onClick={() => {
            // NOTE this works, but there is a slight ~2sec delay before the actual page content appears
            // this is due to the delays in the intro section's styled-components once the hasSeenIntro state is set to true and passed up
            // we may want to introduce a third variable, hasSkipped or something, that would then override the delays in the styled-components and immediately render the page content
            setShouldSkipIntro(true);
          }}
          tabIndex={2}
        >
          Skip Animation
        </SkipButton>
        <Header>
          {isAboveMedium
            ? MEDIUM_WELCOME_DATA.map(letter => {
                return (
                  <StyledSpan
                    key={letter.id}
                    dataId={letter.id}
                    delays={letter.delays}
                    skip={letter.skip}
                    color={letter.color}
                  >
                    {letter.letter}
                  </StyledSpan>
                );
              })
            : SMALL_WELCOME_DATA.map(letter => {
                if (letter.skip) {
                  return (
                    <div key={letter.id} style={{ display: 'inline' }}>
                      <StyledSpan
                        key={letter.id}
                        dataId={letter.id}
                        delays={letter.delays}
                        skip={letter.skip}
                        color={letter.color}
                      >
                        {letter.letter}
                      </StyledSpan>
                      <br />
                    </div>
                  );
                } else {
                  return (
                    <StyledSpan
                      key={letter.id}
                      dataId={letter.id}
                      delays={letter.delays}
                      skip={letter.skip}
                      color={letter.color}
                    >
                      {letter.letter}
                    </StyledSpan>
                  );
                }
              })}
        </Header>
      </AnimationContainer>
    </AnimatedIntroPage>
  );
};

export default AnimatedIntro;
