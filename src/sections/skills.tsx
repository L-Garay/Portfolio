import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { Section, SectionContent, SectionTitle } from '../components/sections';
import { useDeviceContext } from '../contexts/deviceContext';
import SCREEN_SIZES from '../constants/screenSizes';
import Marquee from '../components/Skills/marquee';
import {
  CssSVG,
  HtmlSVG,
  SassSVG,
  JavaScriptSVG,
  ReactSVG,
  RemixSVG,
  TypeScriptSVG,
  GraphQLSVG,
  ApolloSVG,
  NodeSVG,
  PrismaSVG,
  PostgresSVG,
} from '../components/svgs/languages';
import theme from '../styles/theme';
import { Paragraph } from '..//components/shared';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

const LanguageList = [
  {
    svg: <HtmlSVG id="htmlSVG" />,
    name: 'HTML5',
  },
  {
    svg: <CssSVG id="cssSVG" />,
    name: 'CSS3',
  },
  {
    svg: <SassSVG id="sassSVG" />,
    name: 'SaSS',
  },
  {
    svg: <JavaScriptSVG id="jsSVG" />,
    name: 'JavaScript',
  },
  {
    svg: <TypeScriptSVG id="tsSVG" />,
    name: 'TypeScript',
  },
  {
    svg: <ReactSVG id="reactSVG" />,
    name: 'React',
  },
  {
    svg: <RemixSVG id="remixSVG" />,
    name: 'Remix',
  },
  {
    svg: <GraphQLSVG id="gqlSVG" />,
    name: 'GraphQL',
  },
  {
    svg: <ApolloSVG id="apolloSVG" />,
    name: 'Apollo',
  },
  {
    svg: <NodeSVG id="nodeSVG" />,
    name: 'Node',
  },
  {
    svg: <PrismaSVG id="prismaSVG" />,
    name: 'Prisma',
  },
  {
    svg: <PostgresSVG id="psqlSVG" />,
    name: 'PostgreSQL',
  },
];

type DimensionProps = {
  isAboveSmall?: boolean;
  isAboveMedium?: boolean;
  isAboveLarge?: boolean;
  shouldChangeFlexDirection?: boolean;
};

const SkillsContainer = styled.div<DimensionProps>`
  /* background: lightgrey; //testing */
  position: relative;
  margin-bottom: 10px;
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 25%;
    height: ${(props) => (props.shouldChangeFlexDirection ? '10%' : '25%')};
    border-right: 1px solid ${theme.colors.ORANGE_1}; // testing
    border-bottom: 1px solid ${theme.colors.ORANGE_1}; // testing
  }
`;

const TitleContainer = styled.div`
  /* background: lightblue; //testing */
  margin: 30px 0 60px 0;
`;

const LanguageContainer = styled.div<DimensionProps>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: ${({ isAboveLarge }) => (isAboveLarge ? '80%' : '100%')};
  margin: 60px auto 50px auto;

  transition: all 0.2s linear;
`;

const ItemContainer = styled.div<DimensionProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${(props) => {
    if (props.isAboveLarge) return '100px';
    if (props.isAboveMedium) return '80px';
    if (props.isAboveSmall) return '70px';
    return '50px';
  }};
  width: ${(props) => {
    if (props.isAboveLarge) return '100px';
    if (props.isAboveMedium) return '80px';
    if (props.isAboveSmall) return '70px';
    return '50px';
  }};
  margin: ${({ isAboveLarge }) => (isAboveLarge ? '10px 20px' : '10px 10px')};

  transition: all 0.2s linear;
`;

const Name = styled(Paragraph)`
  font-size: clamp(0.8rem, 1.5vw, 1rem);
`;

const Qualities = [
  {
    title: 'Software Development',
    description:
      'Highly proficient in functional programming with a focus on Frontend development. Experienced with a variety of technologies like React, TypeScript, GraphQL, Node and more.',
    imgAlt: 'Man sitting at computer desk with colors coming from monitors',
    imgBase: 'developmentImg.jpg',
  },
  {
    title: 'Interpersonal Skills',
    description:
      'Excellent communicator with over 6+ years of customer service experience, able to effectively communicate with both team members and clients to ensure smooth and positive interactions.',
    imgAlt: 'Animated sketch of people helping each other to climb objects',
    imgBase: 'interpersonalImg.jpg',
  },
  {
    title: 'Adaptability',
    description: `Proven track record of adapting to new environments quickly and ramping up to speed with new technologies and processes.`,
    imgAlt:
      'Animated sketch of a man with many arms performing different tasks',
    imgBase: 'adaptabilityImg.jpg',
  },
];

type QualityProps = DimensionProps & {
  shouldChangeFlexDirection: boolean;
};

const QualitiesContainer = styled.div<QualityProps>`
  /* background: lightpink; //testing */
  display: flex;
  flex-direction: ${({ shouldChangeFlexDirection }) =>
    shouldChangeFlexDirection ? 'column' : 'row'};
`;

const QualitySection = styled.div<QualityProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border: 1px solid black; //testing */
  /* background-color: darkolivegreen; //testing */
  ${(props) => {
    if (props.shouldChangeFlexDirection) {
      return `
      width: 90%;
        margin: 10px auto;
      `;
    } else {
      return `
      width: 33.33%;
      margin: 10px;
    `;
    }
  }}
  div.gatsby-image-wrapper {
    width: ${(props) => {
      if (props.isAboveLarge) return '250px';
      if (props.isAboveMedium) return '200px';
      if (props.isAboveSmall) return '150px';
      return '100px';
    }};
    margin: 10px 10px 0 10px;
    border-radius: 12.5px;
    box-shadow: 0 15px 20px ${theme.colors.ORANGE_2}; //testing
    transition: all 0.2s linear;
  }
`;

const QualityTitle = styled.h4<DimensionProps>`
  text-align: center;
  font-size: clamp(1rem, 2vw, 1.35rem);
  color: ${theme.colors.BLUE_2};
  margin: ${(props) => {
    if (props.isAboveLarge) return '50px 0 10px 0';
    if (props.isAboveMedium) return '40px 0 10px 0';
    if (props.isAboveSmall && !props.shouldChangeFlexDirection)
      return '30px 0 10px 0';
    if (props.isAboveSmall && props.shouldChangeFlexDirection)
      return '30px 0 10px 0';
    return '20px 0 10px 0';
  }};
  transition: all 0.2s linear;
`;

const DescriptionWrapper = styled.div<DimensionProps>`
  display: flex;
  align-items: center;
  min-height: ${(props) => {
    if (props.isAboveLarge) return '140px';
    if (props.isAboveMedium) return '150px';
    if (props.isAboveSmall && !props.shouldChangeFlexDirection) return '160px';
    if (props.isAboveSmall && props.shouldChangeFlexDirection) return '80px';
    return '80px';
  }};
  transition: all 0.2s linear;
`;

const QualityDescription = styled.p`
  text-align: center;
  font-size: clamp(0.8rem, 1.75vw, 1rem);
  color: white;
  margin: 0 10px;
`;

const Skills = () => {
  const { windowWidth, windowHeight, isWindowWidthAboveOrBetweenThreshold } =
    useDeviceContext();

  const isAboveSmall = isWindowWidthAboveOrBetweenThreshold(
    SCREEN_SIZES.MOBILE
  );
  const isAboveMedium = isWindowWidthAboveOrBetweenThreshold(
    SCREEN_SIZES.MEDIUM
  );
  const isAboveLarge = isWindowWidthAboveOrBetweenThreshold(SCREEN_SIZES.LARGE);

  const isMobile = !isAboveSmall;

  const widthDeduction = isAboveLarge ? 450 : isAboveMedium ? 300 : 200;

  const calcluatedWidth = windowWidth - widthDeduction;

  const flexWidthCutOff = SCREEN_SIZES.SMALL + 75;
  const shouldChangeFlexDirection = windowWidth < flexWidthCutOff;

  const imageDataQuery = graphql`
    query {
      allFile(
        filter: {
          extension: { regex: "/(jpg)|(png)|(jpeg)/" }
          relativeDirectory: { eq: "skills" }
        }
      ) {
        edges {
          node {
            base
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  `;

  const {
    allFile: { edges: images },
  } = useStaticQuery(imageDataQuery);
  console.log(images[0].node.childImageSharp);

  return (
    <Section id="skills" height={isMobile ? windowHeight : undefined}>
      <SectionContent isMobile={isMobile} calculatedWidth={calcluatedWidth}>
        <SkillsContainer shouldChangeFlexDirection={shouldChangeFlexDirection}>
          <TitleContainer>
            <SectionTitle> 01. What I'm good at</SectionTitle>
          </TitleContainer>

          <QualitiesContainer
            shouldChangeFlexDirection={shouldChangeFlexDirection}
          >
            {Qualities.map((quality) => {
              const img = images.find(
                (image: any) => image.node.base === quality.imgBase
              );
              return (
                <QualitySection
                  key={quality.title}
                  shouldChangeFlexDirection={shouldChangeFlexDirection}
                  isAboveSmall={isAboveSmall}
                  isAboveMedium={isAboveMedium}
                  isAboveLarge={isAboveLarge}
                >
                  <GatsbyImage
                    image={img.node.childImageSharp.gatsbyImageData}
                    alt={quality.imgAlt}
                  />
                  <QualityTitle
                    isAboveLarge={isAboveLarge}
                    isAboveMedium={isAboveMedium}
                    isAboveSmall={isAboveSmall}
                    shouldChangeFlexDirection={shouldChangeFlexDirection}
                  >
                    {quality.title}
                  </QualityTitle>

                  <DescriptionWrapper
                    isAboveLarge={isAboveLarge}
                    isAboveMedium={isAboveMedium}
                    isAboveSmall={isAboveSmall}
                    shouldChangeFlexDirection={shouldChangeFlexDirection}
                  >
                    <QualityDescription>
                      {quality.description}
                    </QualityDescription>
                  </DescriptionWrapper>
                </QualitySection>
              );
            })}
          </QualitiesContainer>

          {/* <Marquee isMobile={isMobile} marqueeWidth={marqueeWidth} /> */}
          <LanguageContainer isAboveLarge={isAboveLarge}>
            {LanguageList.map((language) => {
              return (
                <ItemContainer
                  isAboveLarge={isAboveLarge}
                  isAboveMedium={isAboveMedium}
                  isAboveSmall={isAboveSmall}
                  key={language.name}
                >
                  {language.svg}
                  <Name>{language.name}</Name>
                </ItemContainer>
              );
            })}
          </LanguageContainer>
        </SkillsContainer>
      </SectionContent>
    </Section>
  );
};

export default Skills;
