import React from 'react';
import theme from '../../styles/theme';
import styled from 'styled-components';

type DonutProps = {
  percentageFill: number;
  isActive: boolean;
  color?: string;
  minWidth?: number;
};

export const StyledDonut = styled.div<DonutProps>`
  .skill {
    width: 160px;
    height: 160px;
    background: lightblue;
  }
  .outer {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    box-shadow: 6px 6px 10px -1px rgba(0, 0, 0, 0.15),
      -6px -6px 10px -1px rgba(255, 255, 255, 0.7);
    padding: 20px;
  }
  .inner {
    height: 120px;
    width: 120px;
    border-radius: 50%;
    box-shadow: inset 4px 4px 6px -1px rgba(0, 0, 0, 0.2),
      inset -4px -4px 6px -1px rgba(255, 255, 255, 0.7),
      -0.5px -0.5px 0px rgba(255, 255, 255, 1),
      0.5px 0.5px 0px rgba(0, 0, 0, 0.15),
      0px 12px 10px -10px rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #percentage {
    font-weight: bold;
    color: black;
  }

  circle {
    fill: none;
    stroke: url(#GradientColor);
    stroke-width: 20;
    stroke-dasharray: 440;
    stroke-dashoffset: ${({ isActive }) => {
      return isActive ? 440 : 154;
    }}; // this needs to match the value of the stroke-dasharray so that it starts as an empty circle and fills up (lowers the offset)
    animation: fill 1.2s linear forwards;
    /* NOTE need to conditionally control when this animation runs, need to prevent it from running unless it is the current active slide in the carousel */
    animation-play-state: ${(props) => (props.isActive ? 'running' : 'paused')};
    @keyframes fill {
      100% {
        // the value at 100% needs to be the calculated value of the percentage of the filled circle
        // 440-440*.65 = 154
        stroke-dashoffset: 154;
      }
    }
  }
  svg {
    position: absolute;
    top: 0;
    left: 0;
  }
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
      // make sure to clean up
      return () => clearInterval(id);
    }
  }, [delay]);
}

// TODO all the values are hardcoded, need to make them dynamic
const Donut = ({ percentageFill, isActive }: DonutProps) => {
  const [counter, setCounter] = React.useState(0);
  const counterComplete = counter === percentageFill;

  useInterval(
    () => {
      if (counter < percentageFill) {
        setCounter(counter + 1);
      }
    },
    counterComplete || !isActive ? null : 20
  );

  return (
    <StyledDonut percentageFill={percentageFill} isActive={isActive}>
      <div className="skill">
        <div className="outer">
          <div className="inner">
            <div id="percentage">{isActive ? counter : percentageFill}%</div>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="160px"
          height="160px"
        >
          <defs>
            <linearGradient id="GradientColor">
              <stop offset="0%" stopColor="#ff0000" />
              <stop offset="100%" stopColor="#0000ff" />
            </linearGradient>
          </defs>
          <circle cx="80" cy="80" r="70" strokeLinecap="round" />
        </svg>
      </div>
    </StyledDonut>
  );
};

export default Donut;
