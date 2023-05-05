import React from 'react';
import styled from 'styled-components';

type PieData = {
  name: string;
  percentage: number;
  strokeColor: string;
  strokeDashValue: number;
  id: string;
};

type PieProps = {
  isActive: boolean;
  pieData: PieData[];
};

type StyledPieProps = PieProps & {
  circumference: number;
};

const StyledPie = styled.div<StyledPieProps>`
  position: relative;
  width: 160px;
  height: 160px;
  margin: 10px;
  ${({ pieData, isActive, circumference }) => {
    const styles = pieData.map((slice: PieData) => {
      return `
       svg > circle#${slice.id} {
          stroke: ${slice.strokeColor};
          stroke-dasharray: ${
            isActive
              ? `0 ${circumference}`
              : `${slice.strokeDashValue} ${circumference}`
          };
          animation-name: ${slice.id};
          @keyframes ${slice.id} {
            100% {
              stroke-dasharray: ${`${slice.strokeDashValue} ${circumference}`};
            }
          }
        }
      `;
    });
    return styles.join('');
  }}
`;

const SVG = styled.svg`
  display: block;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: visible;
  transform: rotate(-90deg);
`;

type CircleProps = Omit<StyledPieProps, 'pieData'> & {
  strokeDashValue: number;
  strokeColor: string;
  id: string;
};

const CIRCLE = styled.circle<CircleProps>`
  fill: none;
  stroke-width: 31.85px;
  /* NOTE during the animation you can see a very faint line within the second slice (the black one currently), which appears to be the whatever color the first slice is */
  /* I don't know why that's happening and why only in the second slice */
  /* first thought is maybe add some sort of delayed opacity transition, where the delay is longest for the first slices and shortest for the last ones (the ones that get rendered first) */
  /* another thought is to use similar colors in those slices to try to avoid as much contrast as possible */
  animation: ${({ id }) => id} 2s linear forwards;
  animation-play-state: ${({ isActive }) => (isActive ? 'running' : 'paused')};
`;

const AnimatedPie = ({ isActive, pieData }: PieProps) => {
  const radius = 15.9;
  const circumference = 2 * Math.PI * radius;

  return (
    <StyledPie
      circumference={circumference}
      isActive={isActive}
      pieData={pieData}
    >
      <SVG viewBox="0 0 62 62">
        {pieData.map((pie) => {
          return (
            <CIRCLE
              className="slice-of-pie"
              cx="30"
              cy="30"
              r={radius}
              id={pie.id}
              key={pie.name}
              isActive={isActive}
              circumference={circumference}
              strokeColor={pie.strokeColor}
              strokeDashValue={pie.strokeDashValue}
            />
          );
        })}
      </SVG>
    </StyledPie>
  );
};

export default AnimatedPie;
