import * as React from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { SkillsProps } from '../../sections/skills';

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
  /* background: lightpink; //testing */
  display: flex;
  flex-direction: ${({ shouldChangeFlexDirection }) =>
    shouldChangeFlexDirection ? 'column' : 'row'};
`;

const QualitySection = styled.div<SkillsProps>`
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

const QualityTitle = styled.h4<SkillsProps>`
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

const DescriptionWrapper = styled.div<SkillsProps>`
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

const Qualities = ({
  isAboveSmall,
  isAboveMedium,
  isAboveLarge,
  shouldChangeFlexDirection,
}: SkillsProps) => {
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
    <QualitiesContainer shouldChangeFlexDirection={shouldChangeFlexDirection}>
      {QualitiesList.map((quality) => {
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
              <QualityDescription>{quality.description}</QualityDescription>
            </DescriptionWrapper>
          </QualitySection>
        );
      })}
    </QualitiesContainer>
  );
};

export default Qualities;
