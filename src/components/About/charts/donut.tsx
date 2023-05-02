import React from 'react';
import styled, { keyframes } from 'styled-components';

type DonutProps = {
  percentageFill: number;
  isActive: boolean;
  circleColor1: string;
  circleColor2: string;
  linearGradientId: string;
};

const DonutContainer = styled.div`
  width: 160px;
  height: 160px;
  background: lightblue;
  position: relative;
  margin: 10px;
`;

const OuterCircle = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 50%;
  box-shadow: 6px 6px 10px -1px rgba(0, 0, 0, 0.15),
    -6px -6px 10px -1px rgba(255, 255, 255, 0.7);
  padding: 20px;
`;

const InnerCircle = styled.div`
  height: 120px;
  width: 120px;
  border-radius: 50%;
  box-shadow: inset 4px 4px 6px -1px rgba(0, 0, 0, 0.2),
    inset -4px -4px 6px -1px rgba(255, 255, 255, 0.7),
    -0.5px -0.5px 0px rgba(255, 255, 255, 1),
    0.5px 0.5px 0px rgba(0, 0, 0, 0.15), 0px 12px 10px -10px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Percentage = styled.p`
  margin: 0;
  font-weight: bold;
  color: black;
`;

const SVG = styled.svg.attrs({
  xmlns: 'http://www.w3.org/2000/svg',
  version: '1.1',
  width: '160px',
  height: '160px',
})`
  position: absolute;
  top: 0;
  left: 0;
  transform: rotate(-90deg);
`;

type CircleProps = {
  percentageFill: number;
  isActive: boolean;
  dashArray: number;
  dashOffset: number;
  linearGradientId: string;
  circleKeyFrame: any;
};

const CIRCLE = styled.circle.attrs({
  cx: '80',
  cy: '80',
  r: '70',
})<CircleProps>`
  fill: none;
  stroke: ${({ linearGradientId }) => `url(#${linearGradientId})`};
  stroke-width: 20;
  animation: fill 1.2s linear forwards;
  ${({ isActive, dashArray, dashOffset, circleKeyFrame }) => {
    return `
      stroke-dasharray: ${dashArray};
      // this needs to match the value of the stroke-dasharray so that it starts as an empty circle and fills up (lowers the offset)
      stroke-dashoffset: ${isActive ? dashArray : dashOffset};      
      animation-play-state: ${isActive ? 'running' : 'paused'};
      `;
  }}
  animation-name: ${({ circleKeyFrame }) => circleKeyFrame};
`;

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback: any, delay: number | null) {
  const savedCallback = React.useRef();

  // Remember the latest callback
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  React.useEffect(() => {
    function tick() {
      // @ts-ignore
      savedCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const Donut = ({
  percentageFill,
  isActive,
  circleColor1,
  circleColor2,
  linearGradientId,
}: DonutProps) => {
  const [counter, setCounter] = React.useState(0);
  const counterComplete = counter === percentageFill;
  const STROKE_DASHARRAY = 440;
  const DECIMAL = percentageFill / 100;
  //ex: 440-440*.65 = 154
  const STROKE_DASHOFFSET = STROKE_DASHARRAY - STROKE_DASHARRAY * DECIMAL;

  const circleKeyFrame = keyframes`
    100% {
      stroke-dashoffset: ${STROKE_DASHOFFSET};
    }
  `;

  useInterval(
    () => {
      if (counter < percentageFill) {
        setCounter(counter + 1);
      }
    },
    counterComplete || !isActive ? null : 20
  );

  return (
    <DonutContainer>
      <OuterCircle>
        <InnerCircle>
          <Percentage>{isActive ? counter : percentageFill}%</Percentage>
        </InnerCircle>
      </OuterCircle>
      <SVG>
        <defs>
          <linearGradient id={linearGradientId}>
            <stop offset="0%" stopColor={circleColor1} />
            <stop offset="100%" stopColor={circleColor2} />
          </linearGradient>
        </defs>
        <CIRCLE
          isActive={isActive}
          percentageFill={percentageFill}
          strokeLinecap="round"
          dashArray={STROKE_DASHARRAY}
          dashOffset={STROKE_DASHOFFSET}
          linearGradientId={linearGradientId}
          circleKeyFrame={circleKeyFrame}
        />
      </SVG>
    </DonutContainer>
  );
};

export default Donut;
