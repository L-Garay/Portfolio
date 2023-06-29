import * as React from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { SkillsProps } from '../../sections/skills';
import { useDeviceContext } from '../../contexts/deviceContext';
import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import { useEffect, useState } from 'react';

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
            __typename
            contentful_id
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
            sys {
              contentType {
                sys {
                  id
                }
              }
            }
          }
        }
      }
    }
  `;

  const {
    allContentfulSkillsQualities: { edges: contentfulData }
  } = useStaticQuery(contentfulDataQuery);

  const noNodeContentfulData = contentfulData.map((data: any) => data.node);
  const [data, setData] = useState(noNodeContentfulData);

  type LivePreviewData = {
    contentfulData: any;
    sys: {
      id: any;
    };
    __typename: any;
    title: string;
    description: string;
    id: string;
    image: any;
  };

  console.log('noNodeContentfulData: ', noNodeContentfulData);
  const livePreviewData1 = useContentfulLiveUpdates({
    contentfulData: noNodeContentfulData[0],
    __typename: 'ContentfulSkillsQualities',
    sys: { id: noNodeContentfulData[0].contentful_id }
  }) as LivePreviewData;

  const livePreviewData2 = useContentfulLiveUpdates({
    contentfulData: noNodeContentfulData[1],
    __typename: 'ContentfulSkillsQualities',
    sys: { id: noNodeContentfulData[1].contentful_id }
  }) as LivePreviewData;

  const livePreviewData3 = useContentfulLiveUpdates({
    contentfulData: noNodeContentfulData[2],
    __typename: 'ContentfulSkillsQualities',
    sys: { id: noNodeContentfulData[2].contentful_id }
  }) as LivePreviewData;

  console.log(
    'livePreviewData: ',
    livePreviewData1,
    livePreviewData2,
    livePreviewData3
  );

  const hasPreview1Changed =
    !!livePreviewData1.title ||
    !!livePreviewData1.image ||
    !!livePreviewData1.description;

  useEffect(() => {
    console.log('hasPreview1Changed: ', hasPreview1Changed);
    if (hasPreview1Changed) {
      const nonUpdated = data.filter(
        (data: ContentfulQualitiesData) =>
          data.id !== livePreviewData1.contentfulData.id
      );
      console.log('nonUpdated:', nonUpdated);
      setData([
        ...nonUpdated,
        {
          title: livePreviewData1.title,
          description: livePreviewData1.description,
          image: livePreviewData1.image,
          id: livePreviewData1.contentfulData.id
        }
      ]);
    }
  }, [hasPreview1Changed]);

  const hasPreview2Changed =
    !!livePreviewData2.title ||
    !!livePreviewData2.image ||
    !!livePreviewData2.description;

  useEffect(() => {
    console.log('hasPreview2Changed: ', hasPreview2Changed);
    if (hasPreview2Changed) {
      const nonUpdated = data.filter(
        (data: ContentfulQualitiesData) =>
          data.id !== livePreviewData2.contentfulData.id
      );
      console.log('nonUpdated:', nonUpdated);
      setData([
        ...nonUpdated,
        {
          title: livePreviewData2.title,
          description: livePreviewData2.description,
          image: livePreviewData2.image,
          id: livePreviewData2.contentfulData.id
        }
      ]);
    }
  }, [hasPreview2Changed]);

  const hasPreview3Changed =
    !!livePreviewData3.title ||
    !!livePreviewData3.image ||
    !!livePreviewData3.description;

  useEffect(() => {
    console.log('hasPreview3Changed: ', hasPreview3Changed);
    if (hasPreview3Changed) {
      const nonUpdated = data.filter(
        (data: ContentfulQualitiesData) =>
          data.id !== livePreviewData3.contentfulData.id
      );
      console.log('nonUpdated:', nonUpdated);
      setData([
        ...nonUpdated,
        {
          title: livePreviewData3.title,
          description: livePreviewData3.description,
          image: livePreviewData3.image,
          id: livePreviewData3.contentfulData.id
        }
      ]);
    }
  }, [hasPreview3Changed]);

  console.log('data to be used: ', data);

  return (
    <QualitiesContainer
      shouldChangeFlexDirection={shouldChangeFlexDirection}
      inView={inView}
    >
      {data.map((data: ContentfulQualitiesData) => {
        const { id, title, description, image } = data;
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
