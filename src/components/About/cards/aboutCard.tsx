import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { useDeviceContext } from '../../../contexts/deviceContext';
import SCREEN_SIZES from '../../../constants/screenSizes';
import theme from '../../../styles/theme';

type DeviceProps = {
  isAboveMobile: boolean;
  isAboveSmall: boolean;
  isAboveLarge: boolean;
};

const AboutCardContainer = styled.div<DeviceProps>`
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

const Title = styled.h3<DeviceProps>`
  margin: 0;
  padding: 0;
  color: ${theme.colors.BLUE_1};
  font-family: ${theme.fonts.robotoMono};
`;

const ContentContainer = styled.div`
  padding: 10px;
`;

const Row1 = styled.div`
  display: flex;
  justify-content: center;
  margin: 0px 10px 20px 10px;
`;

const ImageWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

const Row2 = styled.div<DeviceProps>`
  display: flex;
  ${({ isAboveSmall }) => {
    if (isAboveSmall) {
      return `
      justify-content: space-around;
      `;
    } else {
      return `
        flex-direction: column;
        align-items: center;
        text-align: center;
      `;
    }
  }}
  margin: 10px;
`;

const DESCRIPTION_STYLES = `
  p {
    margin-top: 0;
    padding: 0;
    font-family: ${theme.fonts.robotoMono};
  }
`;

const Description1 = styled.div<DeviceProps>`
  ${DESCRIPTION_STYLES}
  width: ${({ isAboveLarge, isAboveSmall }) => {
    if (isAboveLarge) {
      return `
        350px
      `;
    } else if (isAboveSmall) {
      return `
        280px
      `;
    } else {
      return `
        325px
      `;
    }
  }};
  margin: ${({ isAboveSmall }) => (isAboveSmall ? '0 10px 0 0' : '0 auto')};
  font-size: ${({ isAboveSmall }) => {
    if (isAboveSmall) {
      return `
       .85rem;
      `;
    } else {
      return `
       .85rem;
      `;
    }
  }};
`;

const Description2 = styled.div<DeviceProps>`
  ${DESCRIPTION_STYLES}
  width: ${({ isAboveLarge, isAboveSmall }) => {
    if (isAboveLarge) {
      return `
         350px
      `;
    } else if (isAboveSmall) {
      return `
        280px
      `;
    } else {
      return `
        325px
      `;
    }
  }};
  margin: ${({ isAboveSmall }) => (isAboveSmall ? '0 0 0 10px' : '0 auto')};
  font-size: ${({ isAboveSmall }) => {
    if (isAboveSmall) {
      return `
       .85rem;
      `;
    } else {
      return `
       .85rem;
      `;
    }
  }};
`;

const Row3 = styled.div`
  text-align: center;
`;
const SmallParagraph = styled.p`
  max-width: 730px;
  margin: 10px;
  padding: 0;
  font-size: 0.8rem;
`;

const Link = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  color: ${theme.colors.BLUE_1};
  text-decoration: none;
  border-radius: 0;
  background-image: linear-gradient(
      transparent calc(100% - 2px),
      rgb(252, 114, 80) 2px
    ),
    linear-gradient(transparent calc(100% - 2px), transparent 2px);
  background-size: 0% 3px, 100% 3px;
  background-repeat: no-repeat;
  background-position: 0 bottom, 0 bottom;
  transition: all 1s cubic-bezier(0.23, 1, 0.32, 1);
  padding-bottom: 2px;
  width: calc(100%);

  &:hover {
    background-size: 100% 3px, 100% 3px;
    cursor: pointer;
  }
`;

const AboutCard = () => {
  const [isHoveringImage, setIsHoveringImage] = React.useState(false);
  const { isWindowWidthAboveOrBetweenThreshold } = useDeviceContext();

  const isAboveMobile = isWindowWidthAboveOrBetweenThreshold(
    SCREEN_SIZES.MOBILE
  );
  const aboveMobile = isAboveMobile ? isAboveMobile : false;

  const isAboveSmall = isWindowWidthAboveOrBetweenThreshold(SCREEN_SIZES.SMALL);
  const aboveSmall = isAboveSmall ? isAboveSmall : false;

  const isAboveLarge = isWindowWidthAboveOrBetweenThreshold(1450);
  const aboveLarge = isAboveLarge ? isAboveLarge : false;

  const profileImg = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "squareColorPortrait.jpg" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
    }
  `);
  return (
    <AboutCardContainer
      isAboveMobile={aboveMobile}
      isAboveSmall={aboveSmall}
      isAboveLarge={aboveLarge}
    >
      <TitleContainer>
        <Title
          isAboveMobile={aboveMobile}
          isAboveSmall={aboveSmall}
          isAboveLarge={aboveLarge}
        >
          You know that I know that you want to know about me
        </Title>
      </TitleContainer>
      <ContentContainer>
        <Row1>
          <ImageWrapper
            onMouseOver={() => setIsHoveringImage(true)}
            onMouseLeave={() => setIsHoveringImage(false)}
          >
            <GatsbyImage
              image={profileImg.file.childImageSharp.gatsbyImageData}
              alt="black and white oval portrait of Logan Garay"
              imgStyle={{
                width: isAboveLarge
                  ? '200px'
                  : isAboveSmall
                  ? '165px'
                  : '130px',
              }}
              style={{
                width: isAboveLarge
                  ? '200px'
                  : isAboveSmall
                  ? '165px'
                  : '130px',
                borderRadius: '12.5px',
                filter: isHoveringImage ? 'grayscale(0%)' : 'grayscale(100%)',
                transition: 'filter 0.25s ease',
              }}
              loading="eager"
            />
          </ImageWrapper>
        </Row1>
        <Row2
          isAboveMobile={aboveMobile}
          isAboveSmall={aboveSmall}
          isAboveLarge={aboveLarge}
        >
          <Description1
            isAboveMobile={aboveMobile}
            isAboveSmall={aboveSmall}
            isAboveLarge={aboveLarge}
          >
            <p>
              These are always fun to write, am I right? Well I guess I'll tell
              you a little about my background. I have a Bachelors of Science in
              Psychology from{' '}
              <Link href="https://www.isu.edu/">Idaho State University</Link>,
              with a minor in Philosophy.
            </p>
            <p>
              After I graduated in May 2019 I was left with a choice of what to
              do with my life. My friend wanted to make video games and the
              first step was to learn basic programming, and thanks to{' '}
              <Link href="https://boisecodeworks.com/">Boise Codeworks</Link>{' '}
              and 13 weeks later I was hooked. After that, well... the rest is
              history.
            </p>
          </Description1>
          <Description2
            isAboveMobile={aboveMobile}
            isAboveSmall={aboveSmall}
            isAboveLarge={aboveLarge}
          >
            <p>
              When I'm not coding you can usually find me spending time with my
              friends and two dogs, playing video games, lifting heavy weights
              or watching some anime.
            </p>
            <p>
              I have a passion for learning and am interested in all things
              astronomy, anthropology, philosophy, history, psychology and of
              course web development (to name a few); as I believe everyone
              should strive to better understand the world around them.
            </p>
          </Description2>
        </Row2>
        <Row3>
          <SmallParagraph>
            {aboveLarge
              ? 'This carousel and the different charts were created without any            external dependencies.'
              : 'The charts were create without any external dependencies.'}
          </SmallParagraph>
        </Row3>
      </ContentContainer>
    </AboutCardContainer>
  );
};

export default AboutCard;
