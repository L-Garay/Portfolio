import * as React from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { SkillsProps } from '../../sections/skills';
import { useDeviceContext } from '../../contexts/deviceContext';

const QualitiesList = [
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

const QualitiesContainer = styled.div<SkillsProps>`
  display: flex;
  flex-direction: ${({ shouldChangeFlexDirection }) =>
    shouldChangeFlexDirection ? 'column' : 'row'};
`;

const QualitySection = styled.div<SkillsProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
    max-width: ${(props) => {
      if (props.isAboveLarge) return '250px';
      if (props.isAboveMedium) return '200px';
      if (props.isAboveMobile) return '150px';
      return '100px';
    }};
    margin: 10px 10px 0 10px;
    border-radius: 12.5px;
    box-shadow: ${({ isAboveLarge, isAboveMedium, isAboveMobile }) => {
      if (isAboveMedium) {
        return `0 15px 20px ${theme.colors.ORANGE_2}`;
      } else {
        return `0 8.5px 20px ${theme.colors.ORANGE_2}`;
      }
    }};
    transition: all 0.2s linear;
  }
`;

const QualityTitle = styled.h4<SkillsProps>`
  text-align: center;
  font-size: clamp(1rem, 2vw, 1.35rem);
  color: ${theme.colors.BLUE_2};
  margin: ${(props) => {
    if (props.isAboveMedium) return '50px 0 10px 0';
    return '40px 0 10px 0';
  }};
  transition: all 0.2s linear;
`;

type DescriptionProps = SkillsProps & {
  isAbove1450: boolean;
};

const DescriptionWrapper = styled.div<DescriptionProps>`
  display: flex;
  align-items: start;
  padding-top: 10px;
  min-height: ${(props) => {
    if (props.isAbove1450) return '145px';
    if (props.isAboveMedium) return '185px';
    if (props.isAboveMobile && !props.shouldChangeFlexDirection) return '175px';
    if (props.isAboveMobile && props.shouldChangeFlexDirection) return '80px';
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

const Qualities = ({
  isAboveMobile,
  isAboveMedium,
  isAboveLarge,
  shouldChangeFlexDirection,
}: SkillsProps) => {
  const { isWindowWidthAboveOrBetweenThreshold } = useDeviceContext();

  const isAbove1450 = isWindowWidthAboveOrBetweenThreshold(1450);
  const above1450 = isAbove1450 ? isAbove1450 : false;

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

  return (
    <QualitiesContainer shouldChangeFlexDirection={shouldChangeFlexDirection}>
      {QualitiesList.map((quality) => {
        const img = images.find(
          (image: any) => image.node.base === quality.imgBase
        );
        return (
          <QualitySection
            key={quality.title}
            shouldChangeFlexDirection={shouldChangeFlexDirection}
            isAboveMobile={isAboveMobile}
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
              isAboveMobile={isAboveMobile}
              shouldChangeFlexDirection={shouldChangeFlexDirection}
            >
              {quality.title}
            </QualityTitle>

            <DescriptionWrapper
              isAboveLarge={isAboveLarge}
              isAbove1450={above1450}
              isAboveMedium={isAboveMedium}
              isAboveMobile={isAboveMobile}
              shouldChangeFlexDirection={shouldChangeFlexDirection}
            >
              <QualityDescription>{quality.description}</QualityDescription>
            </DescriptionWrapper>
          </QualitySection>
        );
      })}
    </QualitiesContainer>
  );
};

export default Qualities;
