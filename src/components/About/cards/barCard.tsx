import React from 'react';
import styled from 'styled-components';
import { Bar } from '../charts';
import { BarChartFMConfig } from '../../../utils/configs/aboutConfigs';
import SCREEN_SIZES from '../../../constants/screenSizes';
import { useDeviceContext } from '../../../contexts/deviceContext';
import theme from '../../../styles/theme';
import { graphql, useStaticQuery } from 'gatsby';

type BarCardProps = {
  isActive: boolean;
};

type DeviceProps = {
  isAboveMobile: boolean;
  isAboveSmall: boolean;
  isAboveLarge: boolean;
};

const BarCardContainer = styled.div<DeviceProps>`
  max-width: ${({ isAboveMobile, isAboveSmall, isAboveLarge }) => {
    if (isAboveLarge) {
      return `750px`;
    } else if (isAboveSmall) {
      return `620px`;
    } else if (isAboveMobile) {
      return `567px`;
    } else {
      return `360px`;
    }
  }};
`;

const TitleContainer = styled.div`
  text-align: center;
  padding: 20px 10px 10px 10px;
`;

const Title = styled.h3`
  margin: 0;
  padding: 0;
  color: ${theme.colors.BLUE_1};
  font-family: ${theme.fonts.robotoMono};
`;

const ContentContainer = styled.div<DeviceProps>`
  padding: 10px;
  display: flex;
  ${({ isAboveSmall }) => {
    if (isAboveSmall) {
      return `
        flex-direction: row;
      `;
    } else {
      return `
        flex-direction: column;
        align-items: center;
        text-align: center;
      `;
    }
  }}
`;

const Column1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Description = styled.div`
  max-width: 300px;

  p {
    padding: 0;
    font-size: 0.8rem;
    font-family: ${theme.fonts.robotoMono};
  }
`;

const ChartKey = styled.div`
  min-height: 150px;
  width: 250px;
  font-size: 1rem;
  padding: 10px 5px;
  border: 1px solid ${theme.colors.ORANGE_2};
`;

const KeyItem = styled.p`
  margin: 0;
  margin-bottom: 10px;
  font-family: ${theme.fonts.robotoMono};
  font-size: 0.85rem;
`;

const KeySection = styled.div<DeviceProps>`
  display: flex;
  flex-direction: ${({ isAboveSmall }) => {
    if (isAboveSmall) {
      return `row`;
    } else {
      return `column`;
    }
  }};
`;

const KeySectionItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
  font-family: ${theme.fonts.robotoMono};
  font-size: 0.85rem;

  span {
    min-width: 45px;
    margin-right: 5px;
  }
`;

const Column2 = styled.div``;

const ROW_STYLES = `
  margin: 10px 0;
`;

const Row1 = styled.div`
  ${ROW_STYLES}
`;
const Row2 = styled.div`
  ${ROW_STYLES}
`;
const Row3 = styled.div`
  ${ROW_STYLES}
`;

const BarCard = ({ isActive }: BarCardProps) => {
  const { isWindowWidthAboveOrBetweenThreshold } = useDeviceContext();
  const isAboveMobile = isWindowWidthAboveOrBetweenThreshold(
    SCREEN_SIZES.MOBILE
  );
  const aboveMobile = isAboveMobile ? isAboveMobile : false;
  const isAboveSmall = isWindowWidthAboveOrBetweenThreshold(SCREEN_SIZES.SMALL);
  const aboveSmall = isAboveSmall ? isAboveSmall : false;
  const isAboveLarge = isWindowWidthAboveOrBetweenThreshold(1450);
  const aboveLarge = isAboveLarge ? isAboveLarge : false;

  const contentfulDonutChartQuery = graphql`
    query {
      contentfulAboutMeCards(title: { eq: "You could say I like 'Soccer'" }) {
        id
        title
        descriptions {
          descriptions
        }
      }
    }
  `;

  const { contentfulAboutMeCards: contentfulContent } = useStaticQuery(
    contentfulDonutChartQuery
  );

  const descriptionsArray =
    contentfulContent.descriptions.descriptions.split('$$');

  return (
    <BarCardContainer
      isAboveMobile={aboveMobile}
      isAboveSmall={aboveSmall}
      isAboveLarge={aboveLarge}
    >
      <TitleContainer>
        <Title>{contentfulContent.title}</Title>
      </TitleContainer>
      <ContentContainer
        isAboveMobile={aboveMobile}
        isAboveSmall={aboveSmall}
        isAboveLarge={aboveLarge}
      >
        {aboveSmall ? (
          <>
            <Column1>
              <Description>
                <p>{descriptionsArray[0]}</p>
                <p>{descriptionsArray[1]}</p>
              </Description>
              <ChartKey>
                <KeyItem>'FM' = Football Manager</KeyItem>
                <KeyItem>Total Hours Played: 32,245.7</KeyItem>
                <KeySection
                  isAboveMobile={aboveMobile}
                  isAboveSmall={aboveSmall}
                  isAboveLarge={aboveLarge}
                >
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
                    <>
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
                    </>
                  )}
                </KeySection>
              </ChartKey>
            </Column1>
            <Column2>
              <Bar barData={BarChartFMConfig} isActive={isActive} />
            </Column2>
          </>
        ) : (
          <>
            <Row1>
              <Description>
                <p>{descriptionsArray[0]}</p>
                <p> {descriptionsArray[1]}</p>
              </Description>
            </Row1>
            <Row2>
              <ChartKey>
                <KeySection
                  isAboveMobile={aboveMobile}
                  isAboveSmall={aboveSmall}
                  isAboveLarge={aboveLarge}
                >
                  <KeyItem>'FM' = Football Manager</KeyItem>
                  <KeyItem>Total Hours Played: 32,245.7</KeyItem>
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
                </KeySection>
              </ChartKey>
            </Row2>
            <Row3>
              <Bar barData={BarChartFMConfig} isActive={isActive} />
            </Row3>
          </>
        )}
      </ContentContainer>
    </BarCardContainer>
  );
};

export default BarCard;
