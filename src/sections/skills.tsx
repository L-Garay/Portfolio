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
};

const SkillsContainer = styled.div`
  background: lightgrey; //testing
`;

const TitleContainer = styled.div`
  background: lightblue; //testing
`;

const LanguageContainer = styled.div<DimensionProps>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: ${({ isAboveLarge }) => (isAboveLarge ? '80%' : '100%')};
  margin: 10px auto;

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

type QualityProps = {
  shouldChangeFlexDirection: boolean;
};

const QualitiesContainer = styled.div<QualityProps>`
  background: lightpink; //testing
  display: flex;
  flex-direction: ${({ shouldChangeFlexDirection }) =>
    shouldChangeFlexDirection ? 'column' : 'row'};
`;

const QualitySection = styled.div<QualityProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black; //testing
  background-color: darkolivegreen; //testing
  /* width: 33.33%; */
  /* width: ${({ shouldChangeFlexDirection }) =>
    shouldChangeFlexDirection ? '90%' : '33.33%'}; */
  /* margin: 10px; */
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
`;

const QualityTitle = styled.h4`
  text-align: center;
  font-size: clamp(1rem, 2vw, 1.35rem);
  color: ${theme.colors.BLUE_2};
  margin: 30px 0 10px 0;
`;

const QualityDescription = styled.p`
  text-align: center;
  font-size: clamp(0.8rem, 1.75vw, 1rem);
  color: white;
  margin: 10px;
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
              gatsbyImageData(quality: 100)
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
        <SkillsContainer>
          <TitleContainer>
            <SectionTitle> 01. What I'm good at</SectionTitle>
          </TitleContainer>

          <QualitiesContainer
            shouldChangeFlexDirection={shouldChangeFlexDirection}
          >
            {Qualities.map((quality) => {
              const img = images.find((image: any) => {
                console.log(image.node.base, quality.imgBase);
                return image.node.base === quality.imgBase;
              });
              console.log(img);
              return (
                <QualitySection
                  key={quality.title}
                  shouldChangeFlexDirection={shouldChangeFlexDirection}
                >
                  <GatsbyImage
                    image={img.node.childImageSharp.gatsbyImageData}
                    alt={quality.imgAlt}
                  />
                  <QualityTitle>{quality.title}</QualityTitle>
                  <QualityDescription>{quality.description}</QualityDescription>
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
