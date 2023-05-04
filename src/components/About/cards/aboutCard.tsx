import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import theme from '../../../styles/theme';
import SCREEN_SIZES from '../../../constants/screenSizes';
import { useDeviceContext } from '../../../contexts/deviceContext';

type AboutCardProps = {
  isActive: boolean;
};

type DeviceProps = {
  isAboveLarge: boolean;
};

const AboutCardContainer = styled.div``;

const TitleContainer = styled.div`
  border: 1px solid red;
  background: lightblue;
  padding: 10px;
`;

const Title = styled.h3`
  margin: 0;
  padding: 0;
  color: black;
`;

const ContentContainer = styled.div`
  background: lightgreen;
  padding: 10px;
`;

const Row1 = styled.div`
  background: lightgray;
  display: flex;
  justify-content: center;
  margin: 10px;
`;

const ImageWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

const Row2 = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 10px;
`;

const DESCRIPTION_STYLES = `
  border: 1px solid purple;

  p {
    margin-top: 0;
    padding: 0;
    font-size: 1rem;
  }
`;

const Description1 = styled.div<DeviceProps>`
  ${DESCRIPTION_STYLES}
  max-width: ${({ isAboveLarge }) => {
    if (isAboveLarge) {
      return `
        350px
      `;
    } else {
      return `
        280px
      `;
    }
  }};
  margin: 0 10px 0 0;
`;

const Description2 = styled.div<DeviceProps>`
  ${DESCRIPTION_STYLES}
  max-width: ${({ isAboveLarge }) => {
    if (isAboveLarge) {
      return `
         350px
      `;
    } else {
      return `
        280px
      `;
    }
  }};
  margin: 0 0 0 10px;
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

const AboutCard = ({ isActive }: AboutCardProps) => {
  const [isHoveringImage, setIsHoveringImage] = React.useState(false);
  const { isWindowWidthAboveOrBetweenThreshold } = useDeviceContext();

  const isAboveLarge = isWindowWidthAboveOrBetweenThreshold(1350);
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
    <AboutCardContainer>
      <TitleContainer>
        <Title>You know that I know that you want to know about me</Title>
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
              imgStyle={{ width: isAboveLarge ? '200px' : '165px' }}
              style={{
                width: isAboveLarge ? '200px' : '165px',
                borderRadius: '12.5px',
                filter: isHoveringImage ? 'grayscale(0%)' : 'grayscale(100%)',
                transition: 'filter 0.25s ease',
              }}
              loading="eager"
            />
          </ImageWrapper>
        </Row1>
        <Row2>
          <Description1 isAboveLarge={aboveLarge}>
            <p>
              These are always fun to write, am I right? Well I guess I'll tell
              you a little about my background. I have a Bachelors of Science in
              Psychology from Idaho State University, with a minor in
              Philosophy.
            </p>
            <p>
              After I graduated in May 2019 I was left with a choice of what to
              do with my life. My friend wanted to make video games and the
              first step was to learn basic programming, and a couple of
              exercises on{' '}
              <a href="https://www.freecodecamp.org/">freeCodeCamp.org</a> later
              and I was hooked. After that, well... the rest is history.
            </p>
          </Description1>
          <Description2 isAboveLarge={aboveLarge}>
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
            This carousel and the different charts were created without any
            external dependencies.
          </SmallParagraph>
        </Row3>
      </ContentContainer>
    </AboutCardContainer>
  );
};

export default AboutCard;
