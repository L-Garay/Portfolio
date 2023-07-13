import * as React from 'react';
import styled from 'styled-components';
import { Section, SectionContent } from '../components/sections';
import theme from '../styles/theme';
import { Heading2, Paragraph } from '../components/shared';
import { useDeviceContext } from '../contexts/deviceContext';
import { useIntroContext } from '../contexts/introContext';
import SCREEN_SIZES from '../constants/screenSizes';
import { graphql, useStaticQuery } from 'gatsby';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { BLOCKS } from '@contentful/rich-text-types';
import preventScroll from '../utils/preventScroll';

type IntroductionProps = {
  hasSeenIntro: boolean;
  shouldSkipIntro: boolean;
};

const IntroductionContent = styled.div`
  text-align: start;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Heading = styled.h1<IntroductionProps>`
  margin: 0;
  font-size: clamp(2.5rem, 4vw, 4.5rem);
  color: ${theme.colors.BLUE_1};
  font-family: ${theme.fonts.robotoMono};
  opacity: ${({ hasSeenIntro, shouldSkipIntro }) => {
    if (hasSeenIntro || shouldSkipIntro) {
      return 1;
    } else {
      return 0;
    }
  }};
  transform: ${({ hasSeenIntro, shouldSkipIntro }) => {
    if (hasSeenIntro || shouldSkipIntro) {
      return 'translateY(0)';
    } else {
      return 'translateY(50px)';
    }
  }};
  transition: all 0.5s linear 1s;
`;

const IntroParagraph = styled(Paragraph)<IntroductionProps>`
  font-size: max(1rem, 1.1vw);
  opacity: ${({ hasSeenIntro, shouldSkipIntro }) => {
    if (hasSeenIntro || shouldSkipIntro) {
      return 1;
    } else {
      return 0;
    }
  }};
  transform: ${({ hasSeenIntro, shouldSkipIntro }) => {
    if (hasSeenIntro || shouldSkipIntro) {
      return 'translateY(0)';
    } else {
      return 'translateY(50px)';
    }
  }};
  transition: all 0.5s linear 0.75s;

  &.introduction2 {
    transition: all 0.5s linear 1.5s;
    font-size: max(0.9rem, 1.1vw);
  }
`;

const IntroHeading2 = styled(Heading2)<IntroductionProps>`
  font-size: clamp(1.75rem, 3vw, 3.5rem);
  color: ${theme.colors.ORANGE_1};
  opacity: ${({ hasSeenIntro, shouldSkipIntro }) => {
    if (hasSeenIntro || shouldSkipIntro) {
      return 1;
    } else {
      return 0;
    }
  }};
  transform: ${({ hasSeenIntro, shouldSkipIntro }) => {
    if (hasSeenIntro || shouldSkipIntro) {
      return 'translateY(0)';
    } else {
      return 'translateY(50px)';
    }
  }};
  transition: all 0.5s linear 1.25s;
`;

const Introduction = () => {
  const { hasSeenIntro, shouldSkipIntro } = useIntroContext();
  const { windowWidth, windowHeight, isWindowWidthAboveOrBetweenThreshold } =
    useDeviceContext();

  const isAboveSmall = isWindowWidthAboveOrBetweenThreshold(
    SCREEN_SIZES.MOBILE
  );

  const isMobile = !isAboveSmall;

  const widthDeduction = isMobile ? 100 : 200;

  React.useEffect(() => {
    const anchorLinkTimeout = setTimeout(() => {
      if (shouldSkipIntro) {
        preventScroll(false);
      }
      const hash = window.location.hash;
      if (hash && (hasSeenIntro || shouldSkipIntro)) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 2500); // rough time it takes for intro transitions to finish

    return () => {
      clearTimeout(anchorLinkTimeout);
    };
  }, [hasSeenIntro, shouldSkipIntro]);

  const contentfulGreetingQuery = graphql`
    query {
      contentfulIntroductionGreeting(intro: { eq: "My name is," }) {
        id
        intro
        name
        roleDescription
        summary {
          raw
        }
      }
    }
  `;

  const { contentfulIntroductionGreeting: contentfulContent } = useStaticQuery(
    contentfulGreetingQuery
  );

  const { intro, name, roleDescription, summary } = contentfulContent;

  const contentfuOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
        const text = children[0];
        const convertedText = text.replace('BREAK', '<br />');
        return (
          <IntroParagraph
            hasSeenIntro={hasSeenIntro}
            shouldSkipIntro={shouldSkipIntro}
            className="introduction2"
            dangerouslySetInnerHTML={{ __html: convertedText }}
          />
        );
      }
    }
  };

  return (
    <Section id="introduction" height={isMobile ? windowHeight : undefined}>
      <SectionContent
        isMobile={isMobile}
        calculatedWidth={windowWidth - widthDeduction}
      >
        <IntroductionContent>
          <IntroParagraph
            hasSeenIntro={hasSeenIntro}
            shouldSkipIntro={shouldSkipIntro}
          >
            {intro}{' '}
          </IntroParagraph>
          <Heading
            hasSeenIntro={hasSeenIntro}
            shouldSkipIntro={shouldSkipIntro}
          >
            {name}
          </Heading>
          <IntroHeading2
            hasSeenIntro={hasSeenIntro}
            shouldSkipIntro={shouldSkipIntro}
          >
            {roleDescription}
          </IntroHeading2>
          {renderRichText(summary, contentfuOptions)}
        </IntroductionContent>
      </SectionContent>
    </Section>
  );
};

export default Introduction;
