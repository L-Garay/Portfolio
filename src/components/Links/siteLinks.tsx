import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, Paragraph } from '../shared';
import theme from '../../styles/theme';
import { useIntroContext } from '../../contexts/introContext';
import { graphql, useStaticQuery } from 'gatsby';

const SiteLinksContainer = styled.div`
  position: fixed;
  bottom: 35%;
  right: 0;
  z-index: 10;
`;

type TransformWrapperProps = {
  hasSeenIntro: boolean;
  transformDelay: number;
  shouldSkipIntro: boolean;
};

const TransformWrapper = styled.div<TransformWrapperProps>`
  opacity: ${({ hasSeenIntro, shouldSkipIntro }) => {
    if (hasSeenIntro || shouldSkipIntro) {
      return 1;
    } else {
      return 0;
    }
  }};
  transform: ${({ hasSeenIntro, shouldSkipIntro }) => {
    if (hasSeenIntro || shouldSkipIntro) {
      return 'translateX(0)';
    } else {
      return 'translateX(75px)';
    }
  }};
  transition: opacity, transform;
  transition-duration: 0.5s, 0.35s;
  transition-timing-function: linear;
  transition-delay: ${({ transformDelay }) => `.75s, ${transformDelay}s`};
`;

const SiteLink = styled(Link)`
  text-shadow: 1px 1px 2px black;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

type SiteLinkWrapperProps = {
  isHovering: boolean;
};

const SiteLinkWrapper = styled.div<SiteLinkWrapperProps>`
  height: 50px;
  width: 50px; // will expand out on hover to fit name of section
  margin: 20px;
  border-radius: 12.5px;
  border: 1px solid ${theme.colors.ORANGE_2};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;

  ${props => {
    if (props.isHovering) {
      return `
        border-radius: 0 12.5px 12.5px 0;
        background-color: ${theme.colors.BLUE_5};
        border: 1px solid ${theme.colors.BLUE_1};
        transition: all .5s linear;
        ${SiteLink} {
          color: ${theme.colors.ORANGE_1};
        }
      `;
    } else
      return `
      border-radius: 12.5px;
      background-color: transparent;
      border: 1px solid ${theme.colors.ORANGE_2};
      transition: all .5s linear;
    `;
  }}
`;

type SectionNameBannerProps = Pick<SiteLinkWrapperProps, 'isHovering'>;

const SectionNameBanner = styled.div<SectionNameBannerProps>`
  position: absolute;
  top: -1px;
  right: 100%;
  background-color: grey;
  opacity: 0;
  color: ${theme.colors.ORANGE_1};
  padding: 5px;
  height: 50px;
  width: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12.5px 0 0 12.5px;
  border: none;
  ${props => {
    if (props.isHovering) {
      return `
        width: 150px;
        opacity: 1;
        background-color: ${theme.colors.BLUE_5};
        border: 1px solid ${theme.colors.BLUE_1};
        transition: all .5s linear;

      `;
    } else
      return `
      width: 0px;
      opacity: 0;
      background-color: grey;
      transition: all .5s linear;
    `;
  }}
`;

const SectionName = styled(Paragraph)`
  font-size: 1rem; // will change based on screen size
`;

const INITIAL_TRANSFORM_DELAY = 1.75;
const TRANSFORM_DELAY_DECREMENT = 0.25;

const SiteLinks = () => {
  const { hasSeenIntro, shouldSkipIntro } = useIntroContext();

  const [isHoveringIntroduction, setIsHoveringIntroduction] = useState(false);
  const [isHoveringSkills, setIsHoveringSkills] = useState(false);
  const [isHoveringExperiences, setIsHoveringExperiences] = useState(false);
  const [isHoveringAbout, setIsHoveringAbout] = useState(false);

  const contentfulDataQuery = graphql`
    query {
      allContentfulSectionTitles {
        edges {
          node {
            id
            shortTitle
            number
          }
        }
      }
    }
  `;

  const {
    allContentfulSectionTitles: { edges: contentfulSectionTitles }
  } = useStaticQuery(contentfulDataQuery);

  contentfulSectionTitles.sort(
    (a: { node: { number: number } }, b: { node: { number: number } }) =>
      a.node.number - b.node.number
  );

  return (
    <SiteLinksContainer>
      {contentfulSectionTitles.map((sectionData: any, index: number) => {
        const hoveringValue =
          sectionData.node.shortTitle === 'Introduction'
            ? isHoveringIntroduction
            : sectionData.node.shortTitle === 'Skills'
            ? isHoveringSkills
            : sectionData.node.shortTitle === 'Experiences'
            ? isHoveringExperiences
            : isHoveringAbout;

        const hoveringSetter =
          sectionData.node.shortTitle === 'Introduction'
            ? setIsHoveringIntroduction
            : sectionData.node.shortTitle === 'Skills'
            ? setIsHoveringSkills
            : sectionData.node.shortTitle === 'Experiences'
            ? setIsHoveringExperiences
            : setIsHoveringAbout;

        const transformDelay =
          INITIAL_TRANSFORM_DELAY - TRANSFORM_DELAY_DECREMENT * index;

        const anchorLink = `#${sectionData.node.shortTitle.toLowerCase()}`;

        const noDecimalNumber = sectionData.node.number.slice(0, 2);

        return (
          <TransformWrapper
            hasSeenIntro={hasSeenIntro}
            shouldSkipIntro={shouldSkipIntro}
            transformDelay={transformDelay}
            key={sectionData.node.id}
          >
            <SiteLinkWrapper
              isHovering={hoveringValue}
              onMouseEnter={() => {
                hoveringSetter(true);
              }}
              onMouseLeave={() => {
                hoveringSetter(false);
              }}
            >
              <SiteLink href={anchorLink}>
                <p>{noDecimalNumber}</p>
                <SectionNameBanner isHovering={hoveringValue}>
                  <SectionName>{sectionData.node.shortTitle}</SectionName>
                </SectionNameBanner>
              </SiteLink>
            </SiteLinkWrapper>
          </TransformWrapper>
        );
      })}
    </SiteLinksContainer>
  );
};

export default SiteLinks;
