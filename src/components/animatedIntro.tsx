import React from 'react';
import styled from 'styled-components';
import { useIntroContext } from '../contexts/introContext';
import preventScroll from '../utils/preventScroll';
import theme from '../styles/theme';
import { useDeviceContext } from '../contexts/deviceContext';
import SCREEN_SIZES from '../constants/screenSizes';

type AnimatedIntroProps = {
  hasSeenIntro: boolean;
  shouldRemoveElement: boolean;
};

const AnimatedIntroPage = styled.div<AnimatedIntroProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: black;
  z-index: 200;
  opacity: ${props => (props.hasSeenIntro ? '0' : '1')};
  transition: opacity 1s linear; // may need to adjust this timer, this will be how long the transition will take ONCE the animation is done itself
  display: ${props => (props.shouldRemoveElement ? 'none' : 'block')};
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

type WeclomeData = {
  id: number;
  letter: string;
  delays: {
    enter: number | undefined;
    leave: number | undefined;
  };
  skip?: boolean;
  color?: string;
};

const SMALL_WELCOME_DATA: WeclomeData[] = [
  {
    id: 1,
    letter: 'W',
    delays: {
      enter: 1,
      leave: 3
    },
    color: theme.colors.BLUE_1
  },
  {
    id: 2,
    letter: 'E',
    delays: {
      enter: 1.25,
      leave: 3.25
    }
  },
  {
    id: 3,
    letter: 'L',
    delays: {
      enter: 1.5,
      leave: 3.5
    }
  },
  {
    id: 4,
    letter: 'C',
    delays: {
      enter: 1.75,
      leave: 3.75
    }
  },
  {
    id: 5,
    letter: 'O',
    delays: {
      enter: 2,
      leave: 4
    }
  },
  {
    id: 6,
    letter: 'M',
    delays: {
      enter: 2.25,
      leave: 4.25
    }
  },
  {
    id: 7,
    letter: 'E',
    delays: {
      enter: 2.5,
      leave: 4.5
    }
  },
  {
    id: 100,
    letter: String.fromCharCode(160), // testing for a space
    delays: {
      enter: undefined,
      leave: undefined
    },
    skip: true
  },
  {
    id: 8,
    letter: 'A',
    delays: {
      enter: 2.75,
      leave: 4.75
    },
    color: theme.colors.BLUE_1
  },
  {
    id: 9,
    letter: 'N',
    delays: {
      enter: 3,
      leave: 5
    }
  },
  {
    id: 10,
    letter: 'D',
    delays: {
      enter: 3.25,
      leave: 5.25
    }
  },
  {
    id: 101,
    letter: String.fromCharCode(160), // testing for a space
    delays: {
      enter: undefined,
      leave: undefined
    },
    skip: true
  },
  {
    id: 11,
    letter: 'H',
    delays: {
      enter: 3.5,
      leave: 5.5
    },
    color: theme.colors.BLUE_1
  },
  {
    id: 12,
    letter: 'E',
    delays: {
      enter: 3.75,
      leave: 5.75
    }
  },
  {
    id: 13,
    letter: 'L',
    delays: {
      enter: 4,
      leave: 6
    }
  },
  {
    id: 14,
    letter: 'L',
    delays: {
      enter: 4.25,
      leave: 6.25
    }
  },
  {
    id: 15,
    letter: 'O',
    delays: {
      enter: 4.5,
      leave: 6.5
    }
  }
];

const MEDIUM_WELCOME_DATA: WeclomeData[] = [
  {
    id: 1,
    letter: 'W',
    delays: {
      enter: 1,
      leave: 3
    },
    color: theme.colors.BLUE_1
  },
  {
    id: 2,
    letter: 'E',
    delays: {
      enter: 1.25,
      leave: 3.25
    }
  },
  {
    id: 3,
    letter: 'L',
    delays: {
      enter: 1.5,
      leave: 3.5
    }
  },
  {
    id: 4,
    letter: 'C',
    delays: {
      enter: 1.75,
      leave: 3.75
    }
  },
  {
    id: 5,
    letter: 'O',
    delays: {
      enter: 2,
      leave: 4
    }
  },
  {
    id: 6,
    letter: 'M',
    delays: {
      enter: 2.25,
      leave: 4.25
    }
  },
  {
    id: 7,
    letter: 'E',
    delays: {
      enter: 2.5,
      leave: 4.5
    }
  },
  {
    id: 8,
    letter: String.fromCharCode(160), // testing for a space
    delays: {
      enter: undefined,
      leave: undefined
    },
    skip: true
  },
  {
    id: 9,
    letter: 'A',
    delays: {
      enter: 2.75,
      leave: 4.75
    },
    color: theme.colors.BLUE_1
  },
  {
    id: 10,
    letter: 'N',
    delays: {
      enter: 3,
      leave: 5
    }
  },
  {
    id: 11,
    letter: 'D',
    delays: {
      enter: 3.25,
      leave: 5.25
    }
  },
  {
    id: 12,
    letter: String.fromCharCode(160), // testing for a space
    delays: {
      enter: undefined,
      leave: undefined
    },
    skip: true
  },
  {
    id: 13,
    letter: 'H',
    delays: {
      enter: 3.5,
      leave: 5.5
    },
    color: theme.colors.BLUE_1
  },
  {
    id: 14,
    letter: 'E',
    delays: {
      enter: 3.75,
      leave: 5.75
    }
  },
  {
    id: 15,
    letter: 'L',
    delays: {
      enter: 4,
      leave: 6
    }
  },
  {
    id: 16,
    letter: 'L',
    delays: {
      enter: 3.75, // NOTE no idea why these two values are acting different
      leave: 5.75 // NOTE no idea why these two values are acting different
    }
  },
  {
    id: 17,
    letter: 'O',
    delays: {
      enter: 4, // NOTE no idea why these two values are acting different
      leave: 6 // NOTE no idea why these two values are acting different
    }
  }
];

const AnimatedIntro = () => {
  const [shouldRemoveElement, setShouldRemoveElement] = React.useState(false);
  const { hasMounted, hasSeenIntro, setHasSeenIntro } = useIntroContext();
  const { isWindowWidthAboveOrBetweenThreshold } = useDeviceContext();
  const isAboveMedium = isWindowWidthAboveOrBetweenThreshold(
    SCREEN_SIZES.MEDIUM
  );

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (hasMounted) {
        setHasSeenIntro(true);
      }
    }, 7250); // may need to adjust this timer, this will be the actual time it takes to run the animation BEFORE we start to fade the opacity out

    return () => clearTimeout(timeout);
  }, [hasMounted]);

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
    >
      <AnimationContainer>
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
