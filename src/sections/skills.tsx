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

type SkillsProps = {
  isAboveMedium?: boolean;
  isAboveLarge?: boolean;
};

const SkillsContainer = styled.div`
  background: lightgrey; //testing
`;

const TitleContainer = styled.div`
  background: lightblue; //testing
`;

const QualitiesContainer = styled.div`
  background: lightpink; //testing
`;

const LanguageContainer = styled.div<SkillsProps>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: ${({ isAboveLarge }) => (isAboveLarge ? '80%' : '100%')};
  margin: 10px auto;

  transition: all 0.2s linear;
`;

const ItemContainer = styled.div<SkillsProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${(props) => {
    if (props.isAboveLarge) return '100px';
    if (props.isAboveMedium) return '80px';
    return '70px';
  }};
  width: ${(props) => {
    if (props.isAboveLarge) return '100px';
    if (props.isAboveMedium) return '80px';
    return '70px';
  }};
  margin: ${({ isAboveLarge }) => (isAboveLarge ? '10px 20px' : '10px 10px')};

  transition: all 0.2s linear;
`;

const Name = styled(Paragraph)`
  font-size: clamp(0.8rem, 1.5vw, 1rem);
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

  return (
    <Section id="skills" height={isMobile ? windowHeight : undefined}>
      <SectionContent isMobile={isMobile} calculatedWidth={calcluatedWidth}>
        <SkillsContainer>
          <TitleContainer>
            <SectionTitle>What I'm good at</SectionTitle>
          </TitleContainer>

          <QualitiesContainer>
            <p>qualities here</p>
          </QualitiesContainer>

          {/* <Marquee isMobile={isMobile} marqueeWidth={marqueeWidth} /> */}
          <LanguageContainer isAboveLarge={isAboveLarge}>
            {LanguageList.map((language) => {
              return (
                <ItemContainer
                  isAboveLarge={isAboveLarge}
                  isAboveMedium={isAboveMedium}
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
