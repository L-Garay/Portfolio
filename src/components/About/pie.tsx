import React from 'react';
import theme from '../../styles/theme';
import styled from 'styled-components';

type PieProps = {
  isActive: boolean;
};

type StyledPieProps = PieProps & {
  circumference: number;
};

const StyledPie = styled.div<StyledPieProps>`
  position: relative;
  width: 160px;
  height: 160px;

  svg {
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: visible;
    transform: rotate(-90deg);
  }

  circle {
    fill: none;
    stroke: ${theme.colors.BLUE_1};
    stroke-dasharray: ${({ circumference }) => `0 ${circumference}`};
    stroke-width: 31.85px;
    animation: pie1 2s linear forwards;
    animation-play-state: ${({ isActive }) =>
      isActive ? 'running' : 'paused'};
  }

  .pie1 {
    stroke: lightcoral;
    /* if the pie is not active, fill up the svg the normal amount */
    stroke-dasharray: ${({ circumference, isActive }) => {
      return isActive ? `0 ${circumference}` : `100 ${circumference}`;
    }};
  }
  .pie2 {
    stroke: lightgoldenrodyellow;
    stroke-dasharray: ${({ circumference, isActive }) => {
      return isActive ? `0 ${circumference}` : `80 ${circumference}`;
    }};
    animation-name: pie2;
  }
  .pie3 {
    stroke: lightgreen;
    stroke-dasharray: ${({ circumference, isActive }) => {
      return isActive ? `0 ${circumference}` : `50 ${circumference}`;
    }};
    animation-name: pie3;
  }
  .pie4 {
    stroke: lightsteelblue;
    stroke-dasharray: ${({ circumference, isActive }) => {
      return isActive ? `0 ${circumference}` : `20 ${circumference}`;
    }};
    animation-name: pie4;
  }
  @keyframes pie1 {
    100% {
      stroke-dasharray: ${({ circumference }) => `100 ${circumference}`};
    }
  }
  @keyframes pie2 {
    100% {
      stroke-dasharray: ${({ circumference }) => `80 ${circumference}`};
    }
  }
  @keyframes pie3 {
    100% {
      stroke-dasharray: ${({ circumference }) => `50 ${circumference}`};
    }
  }
  @keyframes pie4 {
    100% {
      stroke-dasharray: ${({ circumference }) => `20 ${circumference}`};
    }
  }
`;

// TODO will need a way to make pie charts of different slice sizes and quantity (one pie with 4 slice vs one with 7)
// will need to pass in a prop of some kind with a collection of like slice ids, and then we can use the prop function and map over the ids to then create the css declarations for each slice
const Pie = ({ isActive }: PieProps) => {
  const radius = 15.9;
  const circumference = 2 * Math.PI * radius;

  return (
    <StyledPie circumference={circumference} isActive={isActive}>
      <svg viewBox="0 0 62 62">
        <circle className="pie1" cx="30" cy="30" r={radius}></circle>
        <circle className="pie2" cx="30" cy="30" r={radius}></circle>
        <circle className="pie3" cx="30" cy="30" r={radius}></circle>
        <circle className="pie4" cx="30" cy="30" r={radius}></circle>
      </svg>
    </StyledPie>
  );
};

export default Pie;
