import React from 'react';
import styled from 'styled-components';
import { Donut } from '../charts';
import { DonutConfig } from '../../../utils/configs/aboutConfigs';
import SCREEN_SIZES from '../../../constants/screenSizes';
import { useDeviceContext } from '../../../contexts/deviceContext';
import theme from '../../../styles/theme';
import { graphql, useStaticQuery } from 'gatsby';

type DonutCardProps = {
  isActive: boolean;
};

type DeviceProps = {
  isAboveMobile: boolean;
  isAboveSmall: boolean;
  isAboveLarge: boolean;
};

const DonutCardContainer = styled.div<DeviceProps>`
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

const ContentContainer = styled.div`
  padding: 40px 10px 10px 10px;
`;

const SHARED_ROW_STYLES = `
  display: flex;
`;

const Row1 = styled.div<DeviceProps>`
  ${SHARED_ROW_STYLES};
  ${({ isAboveSmall }) => {
    if (isAboveSmall) {
      return `
        justify-content: space-between;
      `;
    } else {
      return `
        justify-content: center;
        text-align: center;
      `;
    }
  }}
`;

const Description = styled.div`
  max-width: 300px;
  text-align: center;

  p {
    padding: 0;
    font-family: ${theme.fonts.robotoMono};
    font-size: 1rem;
  }
`;

const Row2 = styled.div<DeviceProps>`
  ${SHARED_ROW_STYLES}
  ${({ isAboveSmall }) => {
    if (isAboveSmall) {
      return ``;
    } else {
      return `
        flex-wrap: wrap;
        justify-content: center;
      `;
    }
  }}
`;

const DonutCard = ({ isActive }: DonutCardProps) => {
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
      contentfulAboutMeCards(title: { eq: "Skills I'd like to learn" }) {
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
    <DonutCardContainer
      isAboveMobile={aboveMobile}
      isAboveSmall={aboveSmall}
      isAboveLarge={aboveLarge}
    >
      <TitleContainer>
        <Title>{contentfulContent.title}</Title>
      </TitleContainer>
      <ContentContainer>
        {aboveSmall ? (
          <>
            <Row1
              isAboveMobile={aboveMobile}
              isAboveSmall={aboveSmall}
              isAboveLarge={aboveLarge}
            >
              <Donut {...DonutConfig[0]} isActive={isActive} />
              <Description>
                <p>{descriptionsArray[0]}</p>
                <p>{descriptionsArray[1]}</p>
              </Description>
              <Donut {...DonutConfig[1]} isActive={isActive} />
            </Row1>
            <Row2
              isAboveMobile={aboveMobile}
              isAboveSmall={aboveSmall}
              isAboveLarge={aboveLarge}
            >
              <Donut {...DonutConfig[2]} isActive={isActive} />
              <Donut {...DonutConfig[3]} isActive={isActive} />
              <Donut {...DonutConfig[4]} isActive={isActive} />
              <Donut {...DonutConfig[5]} isActive={isActive} />
            </Row2>
          </>
        ) : (
          <>
            <Row1
              isAboveMobile={aboveMobile}
              isAboveSmall={aboveSmall}
              isAboveLarge={aboveLarge}
            >
              <Description>
                <p>{descriptionsArray[0]}</p>
                <p>{descriptionsArray[1]}</p>
              </Description>
            </Row1>
            <Row2
              isAboveMobile={aboveMobile}
              isAboveSmall={aboveSmall}
              isAboveLarge={aboveLarge}
            >
              <Donut {...DonutConfig[0]} isActive={isActive} />
              <Donut {...DonutConfig[1]} isActive={isActive} />
              <Donut {...DonutConfig[2]} isActive={isActive} />
              <Donut {...DonutConfig[3]} isActive={isActive} />
              <Donut {...DonutConfig[4]} isActive={isActive} />
              <Donut {...DonutConfig[5]} isActive={isActive} />
            </Row2>
          </>
        )}
      </ContentContainer>
    </DonutCardContainer>
  );
};

export default DonutCard;
