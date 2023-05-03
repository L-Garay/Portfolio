import React from 'react';
import styled from 'styled-components';

type StaticPieData = {
  color: string;
  value: number;
};

type StaticPieProps = {
  pieData: StaticPieData[];
};

const PieContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Graph = styled.div<StaticPieProps>`
  ${({ pieData }) => {
    const variables = pieData
      .map((slice) => {
        return `
          --${slice.color + slice.value}Circle: calc(${slice.value} * 3.6deg);
        `;
      })
      .join('');
    const styles = pieData
      .map((slice) => {
        return `
      ${slice.color} var(--${slice.color + slice.value}Circle),
    `;
      })
      .join('')
      .trim()
      .slice(0, -1);
    return `
      ${variables}
      position: relative;
      display: inline-block;
      width: 160px;
      height: 160px;
      margin: 8px;
      background-image: conic-gradient(
        ${styles}
      );
      border-radius: 50%;
      aspect-ratio: 1;
      border: 1px solid black;
    `;
  }}
`;

const StaticPie = ({ pieData }: StaticPieProps) => {
  return (
    <PieContainer>
      <Graph pieData={pieData}></Graph>
    </PieContainer>
  );
};

export default StaticPie;
