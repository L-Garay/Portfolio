import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, Paragraph } from '../shared';
import theme from '../../styles/theme';
import { useIntroContext } from '../../contexts/introContext';

const SiteLinksContainer = styled.div`
  position: fixed;
  bottom: 35%;
  right: 0;
  z-index: 10;
`;

type TransformWrapperProps = {
  hasSeenIntro: boolean;
  transformDelay: number;
};

const TransformWrapper = styled.div<TransformWrapperProps>`
  opacity: ${({ hasSeenIntro }) => (hasSeenIntro ? '1' : '0')};
  transform: ${({ hasSeenIntro }) =>
    hasSeenIntro ? 'translateX(0)' : 'translateX(75px)'};
  transition: opacity, transform;
  transition-duration: 0.5s, 0.35s;
  transition-timing-function: linear;
  transition-delay: ${({ transformDelay }) => `.75s, ${transformDelay}s`};
`;

const SiteLink = styled(Link)`
  text-shadow: 1px 1px 2px black;
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

  ${(props) => {
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
  ${(props) => {
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

const SiteLinks = () => {
  const { hasSeenIntro } = useIntroContext();

  const [isHoveringIntro, setIsHoveringIntro] = useState(false);
  const [isHoveringSkills, setIsHoveringSkills] = useState(false);
  const [isHoveringExperience, setIsHoveringExperience] = useState(false);
  const [isHoveringJourney, setIsHoveringJourney] = useState(false);
  const [isHoveringAbout, setIsHoveringAbout] = useState(false);

  return (
    <SiteLinksContainer>
      <TransformWrapper hasSeenIntro={hasSeenIntro} transformDelay={1.75}>
        <SiteLinkWrapper
          isHovering={isHoveringIntro}
          onMouseEnter={() => {
            setIsHoveringIntro(true);
          }}
          onMouseLeave={() => {
            setIsHoveringIntro(false);
          }}
        >
          <SiteLink href="#introduction">
            01
            <SectionNameBanner isHovering={isHoveringIntro}>
              <SectionName>Introduction</SectionName>
            </SectionNameBanner>
          </SiteLink>
        </SiteLinkWrapper>
      </TransformWrapper>
      <TransformWrapper hasSeenIntro={hasSeenIntro} transformDelay={1.5}>
        <SiteLinkWrapper
          isHovering={isHoveringSkills}
          onMouseEnter={() => {
            setIsHoveringSkills(true);
          }}
          onMouseLeave={() => {
            setIsHoveringSkills(false);
          }}
        >
          <SiteLink href="#skills">
            02
            <SectionNameBanner isHovering={isHoveringSkills}>
              <SectionName>Skills</SectionName>
            </SectionNameBanner>
          </SiteLink>
        </SiteLinkWrapper>
      </TransformWrapper>
      <TransformWrapper hasSeenIntro={hasSeenIntro} transformDelay={1.25}>
        <SiteLinkWrapper
          isHovering={isHoveringExperience}
          onMouseEnter={() => {
            setIsHoveringExperience(true);
          }}
          onMouseLeave={() => {
            setIsHoveringExperience(false);
          }}
        >
          <SiteLink href="#experience">
            03
            <SectionNameBanner isHovering={isHoveringExperience}>
              <SectionName>Experience</SectionName>
            </SectionNameBanner>
          </SiteLink>
        </SiteLinkWrapper>
      </TransformWrapper>
      {/* <TransformWrapper hasSeenIntro={hasSeenIntro} transformDelay={1.25}>
        <SiteLinkWrapper
          isHovering={isHoveringJourney}
          onMouseEnter={() => {
            setIsHoveringJourney(true);
          }}
          onMouseLeave={() => {
            setIsHoveringJourney(false);
          }}
        >
          <SiteLink href="#journey">04</SiteLink>
          <SectionNameBanner isHovering={isHoveringJourney}>
            <SectionName>Journey</SectionName>
          </SectionNameBanner>
        </SiteLinkWrapper>
      </TransformWrapper> */}
      <TransformWrapper hasSeenIntro={hasSeenIntro} transformDelay={1}>
        <SiteLinkWrapper
          isHovering={isHoveringAbout}
          onMouseEnter={() => {
            setIsHoveringAbout(true);
          }}
          onMouseLeave={() => {
            setIsHoveringAbout(false);
          }}
        >
          <SiteLink href="#about">
            04
            <SectionNameBanner isHovering={isHoveringAbout}>
              <SectionName>About</SectionName>
            </SectionNameBanner>
          </SiteLink>
        </SiteLinkWrapper>
      </TransformWrapper>
    </SiteLinksContainer>
  );
};

export default SiteLinks;
