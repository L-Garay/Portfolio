import React from 'react';
import styled, { keyframes } from 'styled-components';

type BarData = {
  percentageFill: number;
  name: string;
  barColor: string;
  arrowColor: string;
};

type BarProps = {
  barData: BarData[];
  isActive: boolean;
};

const StyledBarGraph = styled.div`
  margin: 10px;
  border-bottom: 3px solid white; // testing
  border-left: 3px solid white; // testing
`;

const ChartTitle = styled.p`
  margin: 0px;
  font-size: 1.1rem; // will need to change
  font-weight: bold;
  text-align: center;
`;

const BarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px 0;
  position: relative;
`;

// NOTE the graph is horizontal from left to right
const BarItemContainer = styled.div`
  position: relative;
  width: clamp(350px, 25vw, 440px); // testing
  height: 50px; // the total height of the bar, will need to be adjusted for responsiveness
  margin: 10px 0;
`;

type BarFillProps = {
  bgColor: string;
  fillPercentage: number;
  barKeyFrames: any;
  isActive: boolean;
};

const BarFill = styled.div<BarFillProps>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: end;
  height: 50px; // the total height of the bar, will need to be adjusted for responsiveness
  width: ${({ isActive, fillPercentage }) =>
    isActive ? '25px' : `${fillPercentage * 3}%`};
  border-top-right-radius: 12.5px;
  border-bottom-right-radius: 12.5px;
  background: ${(props) => props.bgColor};
  animation-fill-mode: forwards;
  animation-delay: 0.25s;
  animation-duration: 0.55s;
  animation-name: ${(props) => props.barKeyFrames};
  animation-play-state: ${(props) => (props.isActive ? 'running' : 'paused')};
`;

type MetricProps = Pick<BarFillProps, 'isActive'>;

const MetricContainer = styled.div<MetricProps>`
  position: absolute;
  top: 15%;
  left: 10px; // testing
  color: white;
  ${({ isActive }) => {
    if (isActive) {
      return `
      opacity: 0;
      animation-duration: 0.25s;
      animation-fill-mode: forwards;
      animation-delay: 0.2s;
      animation-timing-function: linear;
      animation-name: fadeIn;

      @keyframes fadeIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
      `;
    } else {
      return `
        opacity: 1;
      `;
    }
  }}
`;

const MetricNumber = styled.span`
  position: relative;
  font-size: 1rem; // will need to change
`;

const MetricLabel = styled.p`
  max-height: 50px; // the total height of the bar, will need to be adjusted for responsiveness
  margin: 0px;
  font-size: 0.75rem; // will need to change
`;

type ArrowProps = {
  arrowColor: string;
};

const ArrowWrapper = styled.div`
  display: flex;
`;

const ArrowBase = styled.div<ArrowProps>`
  height: 9.5px; // will need to change
  width: 12px; // will need to change
  margin: auto 0px;
  background: ${(props) => props.arrowColor};
`;

const ArrowPoint = styled.div<ArrowProps>`
  width: 0;
  height: 0;
  border-left: 9.5px solid ${(props) => props.arrowColor};
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
`;

const Bar = ({ barData, isActive }: BarProps) => {
  return (
    <StyledBarGraph>
      <ChartTitle>Percentage of total time played</ChartTitle>
      <BarContainer>
        {barData.map((bar) => {
          const { percentageFill, name, barColor, arrowColor } = bar;
          const barKeyFrames = keyframes`
            0% {
              width: 25px;
            }
            100% {
              width: ${percentageFill * 3}%;
            }
          `;
          return (
            <BarItemContainer key={name}>
              <BarFill
                bgColor={barColor}
                fillPercentage={percentageFill}
                barKeyFrames={barKeyFrames}
                isActive={isActive}
              >
                <MetricContainer isActive={isActive}>
                  <MetricNumber>{`${percentageFill}%`}</MetricNumber>
                  <MetricLabel>{name}</MetricLabel>
                </MetricContainer>
                <ArrowWrapper>
                  <ArrowBase arrowColor={arrowColor} />
                  <ArrowPoint arrowColor={arrowColor} />
                </ArrowWrapper>
              </BarFill>
            </BarItemContainer>
          );
        })}
      </BarContainer>
    </StyledBarGraph>
  );
};

export default Bar;
