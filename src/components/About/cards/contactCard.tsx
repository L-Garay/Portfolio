import React from 'react';
import { ButtonAsLink } from '../../../components/shared';
import SOCIALS from '../../../constants/socials';
import styled from 'styled-components';
import theme from '../../../styles/theme';
import SCREEN_SIZES from '../../../constants/screenSizes';
import { useDeviceContext } from '../../../contexts/deviceContext';
import { graphql, useStaticQuery } from 'gatsby';

type ContactCardProps = {};

type DeviceProps = {
  isAboveMobile: boolean;
  isAboveSmall: boolean;
  isAboveLarge: boolean;
};

const ContactCardContainer = styled.div``;

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
  height: ${({ isAboveMobile, isAboveSmall }) =>
    isAboveSmall ? `500px` : `auto`};
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ROW_STYLES = `
  text-align: center;
`;

const Row1 = styled.div`
  ${ROW_STYLES}
  margin: 10px 0;
`;

const Description = styled.div`
  width: 100%;

  p {
    padding: 0;
    font-size: 1.2rem;
    font-family: ${theme.fonts.robotoMono};
  }
`;

const Row2 = styled.div`
  ${ROW_STYLES}
  margin: 10px 0;
`;

type Row3Props = {
  isHovering: boolean;
  hoverTargetId: string;
};

const Row3 = styled.div<Row3Props>`
  ${ROW_STYLES}
  margin: 10px 0;
  padding: 10px 0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;

  ${({ isHovering, hoverTargetId }) => {
    const id = `#${hoverTargetId}`;
    if (isHovering) {
      return `
      a${id} {
        color: ${theme.colors.ORANGE_1};
        box-shadow: inset 0 0 0 2em ${theme.colors.BLUE_5_TRANSPARENT},
                      0 0.5em 0.5em -0.4em ${theme.colors.ORANGE_1};
      }
    `;
    } else return ``;
  }}
`;

type ResumeButtonProps = {
  targetLink: string;
  targetType: string;
};
const ResmueButton = styled(ButtonAsLink).attrs<ResumeButtonProps>(props => ({
  href: props.targetLink,
  target: props.targetType,
  download: props.targetType === '_self' ? true : undefined
}))<ResumeButtonProps>`
  text-align: center;
  cursor: pointer;
  height: 50px;
  display: flex;
  align-items: center;
  color: ${theme.colors.BLUE_1};
  transition: all 0.25s linear;

  &:hover,
  &:focus {
    color: ${theme.colors.ORANGE_1};
    box-shadow: inset 0 0 0 2em ${theme.colors.BLUE_5_TRANSPARENT},
      0 0.5em 0.5em -0.4em ${theme.colors.ORANGE_1};
  }
`;

const ContactCard = ({}: ContactCardProps) => {
  const [isHovering, setIsHovering] = React.useState(false);
  const [hoverTargetId, setHoverTargetId] = React.useState('');
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
      contentfulAboutMeCards(title: { eq: "Get in touch" }) {
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
    <ContactCardContainer>
      <TitleContainer>
        <Title>{contentfulContent.title}</Title>
      </TitleContainer>
      <ContentContainer
        isAboveMobile={aboveMobile}
        isAboveSmall={aboveSmall}
        isAboveLarge={aboveLarge}
      >
        <Row1>
          <Description>
            <p>{descriptionsArray[0]}</p>
            <p>{descriptionsArray[1]} </p>
            <p>{descriptionsArray[2]}</p>
          </Description>
        </Row1>
        <Row2>
          <Description>
            <p>
              <span>Phone: </span>
              {SOCIALS.phone}
            </p>
          </Description>
        </Row2>
        <Row3 isHovering={isHovering} hoverTargetId={hoverTargetId}>
          <ResmueButton
            id="resume"
            onMouseEnter={() => {
              setIsHovering(true);
              setHoverTargetId('resume');
            }}
            onMouseLeave={() => setIsHovering(false)}
            targetLink={SOCIALS.resume}
            targetType="_self"
          >
            Resume
          </ResmueButton>
          <ResmueButton
            id="email"
            onMouseEnter={() => {
              setIsHovering(true);
              setHoverTargetId('email');
            }}
            onMouseLeave={() => setIsHovering(false)}
            targetLink={`mailto:${SOCIALS.email}?subject=Hello%20Logan!`}
            targetType="_self"
          >
            Email me
          </ResmueButton>
          <ResmueButton
            id="linkedIn"
            onMouseEnter={() => {
              setIsHovering(true);
              setHoverTargetId('linkedIn');
            }}
            onMouseLeave={() => setIsHovering(false)}
            targetLink={SOCIALS.linkedIn}
            targetType="_blank"
          >
            LinkedIn
          </ResmueButton>
        </Row3>
      </ContentContainer>
    </ContactCardContainer>
  );
};

export default ContactCard;
