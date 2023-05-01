import React from 'react';
import theme from '../../styles/theme';
import styled from 'styled-components';

type BarProps = {
  percentageFill: number;
};

const StyledBarGraph = styled.div`
  margin: 40px;
  border: 1px solid white; // testing
`;

const BarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
`;

// NOTE the graph is horizontal from left to right
const BarItemContainer = styled.div`
  position: relative;
  width: 250px; // think of this as the max width of each individual bar, will need to be adjusted for responsiveness
  height: 50px; // the total height of the bar, will need to be adjusted for responsiveness
`;

type BarFillProps = {
  bgColor: string;
  fillPercentage: number;
};

const BarFill = styled.div<BarFillProps>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: end;
  height: 50px; // the total height of the bar, will need to be adjusted for responsiveness
  border-top-right-radius: 12.5px;
  border-bottom-right-radius: 12.5px;
  background: ${(props) => props.bgColor};
  animation-duration: 0.35s;
  animation-delay: 0.25s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  animation-name: fillBar;
  @keyframes fillBar {
    0% {
      width: 25px; // this will be the width of the arrow icon, so we can't collapse the bar completely
    }
    100% {
      width: ${(props) => `${props.fillPercentage}%`};
    }
  }
`;

const MetricContainer = styled.div`
  position: absolute;
  top: 15%;
  left: 10px; // testing
  color: white;
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
  /* background-color: grey; // testing */
`;

const ArrowBase = styled.div<ArrowProps>`
  height: 12.5px; // will need to change
  width: 17.5px; // will need to change
  margin: auto 0px;
  background: ${(props) => props.arrowColor};
`;

const ArrowPoint = styled.div<ArrowProps>`
  width: 0;
  height: 0;
  border-left: 12.5px solid ${(props) => props.arrowColor};
  border-top: 17.5px solid transparent;
  border-bottom: 17.5px solid transparent;
`;

const Bar = ({ percentageFill }: BarProps) => {
  return (
    <StyledBarGraph>
      <BarContainer>
        <BarItemContainer>
          <BarFill
            bgColor={theme.colors.BLUE_2}
            fillPercentage={percentageFill}
          >
            <MetricContainer>
              <MetricNumber>{`${percentageFill}%`}</MetricNumber>
              <MetricLabel>test</MetricLabel>
            </MetricContainer>
            <ArrowWrapper>
              <ArrowBase arrowColor={theme.colors.ORANGE_1} />
              <ArrowPoint arrowColor={theme.colors.ORANGE_1} />
            </ArrowWrapper>
          </BarFill>
        </BarItemContainer>
      </BarContainer>
    </StyledBarGraph>
  );
};

export default Bar;
