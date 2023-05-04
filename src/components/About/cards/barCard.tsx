import React from 'react';
import styled from 'styled-components';
import { Bar } from '../charts';
import { barChartTwoData } from '../../../utils/configs/aboutConfigs';
import SCREEN_SIZES from '../../../constants/screenSizes';
import { useDeviceContext } from '../../../contexts/deviceContext';

type BarCardProps = {
  isActive: boolean;
};

type DeviceProps = {
  isAboveLarge: boolean;
};

const BarCardContainer = styled.div<DeviceProps>`
  width: ${({ isAboveLarge }) => {
    if (isAboveLarge) {
      return `750px`;
    } else {
      return `620px`;
    }
  }};
`;

const TitleContainer = styled.div`
  border: 1px solid red;
  background: lightblue;
  padding: 10px;
`;

const Title = styled.h3`
  margin: 0;
  padding: 0;
  color: white;
`;

const ContentContainer = styled.div`
  background: lightgreen;
  padding: 10px;
  display: flex;
`;

const Column1 = styled.div`
  background: lightgray;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Description = styled.div`
  border: 1px solid purple;
  max-width: 300px;

  p {
    padding: 0;
    font-size: 0.9rem;
  }
`;

const ChartKey = styled.div`
  border: 1px solid orange;
  height: 150px;
  width: 250px;
  font-size: 1rem;
  padding: 10px 5px;
`;

const KeyItem = styled.p`
  margin: 0;
  margin-bottom: 10px;
`;

const KeySection = styled.div`
  display: flex;
`;

const KeySectionItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;

  span {
    min-width: 45px;
    margin-right: 5px;
  }
`;

const Column2 = styled.div``;

const BarCard = ({ isActive }: BarCardProps) => {
  const { windowWidth, windowHeight, isWindowWidthAboveOrBetweenThreshold } =
    useDeviceContext();

  const isAboveSmall = isWindowWidthAboveOrBetweenThreshold(
    SCREEN_SIZES.MOBILE
  );
  const isAboveLarge = isWindowWidthAboveOrBetweenThreshold(1350);
  const aboveLarge = isAboveLarge ? isAboveLarge : false;
  return (
    <BarCardContainer isAboveLarge={aboveLarge}>
      <TitleContainer>
        <Title>You could say I like 'Soccer'</Title>
      </TitleContainer>
      <ContentContainer>
        <Column1>
          <Description>
            <p>
              One of my major hobbies is soccer/football/fusbal. I regularly
              watch it and I also have two collegiate intramural championships
              under my belt, but I spend the most time managing virtual teams in
              the Football Manager series.
            </p>
            <p>
              The chart to the right shows just how much I enjoy playing the
              different games in the series. For context, the reason there are
              two outliers is that I left my computer on in school and would
              often leave the game on overnight. I am not THAT obessed with the
              game (is what I tell myself).
            </p>
          </Description>
          <ChartKey>
            <KeyItem>'FM' = Football Manager</KeyItem>
            <KeyItem>Total Hours Played: 32,245.7</KeyItem>
            <KeySection>
              {isAboveSmall ? (
                <>
                  <div>
                    <KeySectionItem>
                      <span> FM 16:</span> 8,580.6
                    </KeySectionItem>
                    <KeySectionItem>
                      <span> FM 18:</span> 6,186.2
                    </KeySectionItem>
                    <KeySectionItem>
                      <span> FM 17:</span> 3,944.1
                    </KeySectionItem>
                  </div>
                  <div>
                    <KeySectionItem>
                      <span> FM 20:</span> 2,548.3
                    </KeySectionItem>
                    <KeySectionItem>
                      <span> FM 14:</span> 1,943.3
                    </KeySectionItem>
                    <KeySectionItem>
                      <span> Others:</span> 9,043.2
                    </KeySectionItem>
                  </div>
                </>
              ) : (
                <div>
                  <KeySectionItem>
                    <span> FM 16:</span> 8,580.6
                  </KeySectionItem>
                  <KeySectionItem>
                    <span> FM 18:</span> 6,186.2
                  </KeySectionItem>
                  <KeySectionItem>
                    <span> FM 17:</span> 3,944.1
                  </KeySectionItem>
                  <KeySectionItem>
                    <span> FM 20:</span> 2,548.3
                  </KeySectionItem>
                  <KeySectionItem>
                    <span> FM 14:</span> 1,943.3
                  </KeySectionItem>
                  <KeySectionItem>
                    <span> Others:</span> 9,043.2
                  </KeySectionItem>
                </div>
              )}
            </KeySection>
          </ChartKey>
        </Column1>
        <Column2>
          <Bar barData={barChartTwoData} isActive={isActive} />
        </Column2>
      </ContentContainer>
    </BarCardContainer>
  );
};

export default BarCard;
