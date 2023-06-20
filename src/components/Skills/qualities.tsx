import * as React from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { SkillsProps } from '../../sections/skills';
import { useDeviceContext } from '../../contexts/deviceContext';

type ContentfulQualitiesData = {
  id: string;
  title: string;
  description: {
    description: string;
  };
  image: {
    title: string;
    description: string;
    gatsbyImageData: IGatsbyImageData;
  };
};

const QualitiesContainer = styled.div<SkillsProps>`
  display: flex;
  flex-direction: ${({ shouldChangeFlexDirection }) =>
    shouldChangeFlexDirection ? 'column' : 'row'};
  ${({ inView }) => {
    if (inView) {
      return `
        opacity: 1;
        transform: translateY(0);
      `;
    } else {
      return `
        opacity: 0;
        transform: translateY(-50px);
      `;
    }
  }};
  transition: all 0.75s linear 0.25s;
`;

const QualitySection = styled.div<SkillsProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${props => {
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
    max-width: ${props => {
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
  margin: ${props => {
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
  min-height: ${props => {
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
  inView
}: SkillsProps) => {
  const { isWindowWidthAboveOrBetweenThreshold } = useDeviceContext();

  const isAbove1450 = isWindowWidthAboveOrBetweenThreshold(1450);
  const above1450 = isAbove1450 ? isAbove1450 : false;

  const contentfulDataQuery = graphql`
    query {
      allContentfulSkillsQualities {
        edges {
          node {
            id
            title
            description {
              description
            }
            image {
              title
              description
              gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  `;

  const {
    allContentfulSkillsQualities: { edges: contentfulImages }
  } = useStaticQuery(contentfulDataQuery);

  return (
    <QualitiesContainer
      shouldChangeFlexDirection={shouldChangeFlexDirection}
      inView={inView}
    >
      {contentfulImages.map((gatsbyNode: { node: ContentfulQualitiesData }) => {
        const { id, title, description, image } = gatsbyNode.node;
        return (
          <QualitySection
            key={id}
            shouldChangeFlexDirection={shouldChangeFlexDirection}
            isAboveMobile={isAboveMobile}
            isAboveMedium={isAboveMedium}
            isAboveLarge={isAboveLarge}
          >
            <GatsbyImage
              image={image.gatsbyImageData}
              alt={image.description}
            />
            <QualityTitle
              isAboveLarge={isAboveLarge}
              isAboveMedium={isAboveMedium}
              isAboveMobile={isAboveMobile}
              shouldChangeFlexDirection={shouldChangeFlexDirection}
            >
              {title}
            </QualityTitle>

            <DescriptionWrapper
              isAboveLarge={isAboveLarge}
              isAbove1450={above1450}
              isAboveMedium={isAboveMedium}
              isAboveMobile={isAboveMobile}
              shouldChangeFlexDirection={shouldChangeFlexDirection}
            >
              <QualityDescription>{description.description}</QualityDescription>
            </DescriptionWrapper>
          </QualitySection>
        );
      })}
    </QualitiesContainer>
  );
};

export default Qualities;
