import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from './shared';
import theme from '../styles/theme';

const SiteLinksContainer = styled.div`
  position: fixed;
  bottom: 35%;
  right: 0;
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
        background-color: ${theme.colors.BLUE_5_TRANSPARENT};
        border: 1px solid ${theme.colors.BLUE_1};
        transition: all .5s linear;
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

const SiteLink = styled(Link)``;

type SectionNameBannerProps = SiteLinkWrapperProps & {};

const SectionNameBanner = styled.div<SectionNameBannerProps>`
  position: absolute;
  top: 0;
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
        background-color: ${theme.colors.BLUE_5_TRANSPARENT};
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

const SectionName = styled.p`
  font-size: 1rem; // will change based on screen size
`;

const SiteLinks = () => {
  const [isHoveringIntro, setIsHoveringIntro] = useState(false);
  const [isHoveringSkills, setIsHoveringSkills] = useState(false);
  const [isHoveringExperience, setIsHoveringExperience] = useState(false);
  const [isHoveringJourney, setIsHoveringJourney] = useState(false);
  const [isHoveringAbout, setIsHoveringAbout] = useState(false);
  return (
    <SiteLinksContainer>
      <SiteLinkWrapper
        isHovering={isHoveringIntro}
        onMouseEnter={() => {
          setIsHoveringIntro(true);
        }}
        onMouseLeave={() => {
          setIsHoveringIntro(false);
        }}
      >
        <SiteLink href="#introduction">01</SiteLink>
        <SectionNameBanner isHovering={isHoveringIntro}>
          <SectionName>Introduction</SectionName>
        </SectionNameBanner>
      </SiteLinkWrapper>
      <SiteLinkWrapper
        isHovering={isHoveringSkills}
        onMouseEnter={() => {
          setIsHoveringSkills(true);
        }}
        onMouseLeave={() => {
          setIsHoveringSkills(false);
        }}
      >
        <SiteLink href="#skills">02</SiteLink>
        <SectionNameBanner isHovering={isHoveringSkills}>
          <SectionName>Skills</SectionName>
        </SectionNameBanner>
      </SiteLinkWrapper>
      <SiteLinkWrapper
        isHovering={isHoveringExperience}
        onMouseEnter={() => {
          setIsHoveringExperience(true);
        }}
        onMouseLeave={() => {
          setIsHoveringExperience(false);
        }}
      >
        <SiteLink href="#experience">03</SiteLink>
        <SectionNameBanner isHovering={isHoveringExperience}>
          <SectionName>Experience</SectionName>
        </SectionNameBanner>
      </SiteLinkWrapper>
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
      <SiteLinkWrapper
        isHovering={isHoveringAbout}
        onMouseEnter={() => {
          setIsHoveringAbout(true);
        }}
        onMouseLeave={() => {
          setIsHoveringAbout(false);
        }}
      >
        <SiteLink href="#about">05</SiteLink>
        <SectionNameBanner isHovering={isHoveringAbout}>
          <SectionName>About</SectionName>
        </SectionNameBanner>
      </SiteLinkWrapper>
    </SiteLinksContainer>
  );
};

export default SiteLinks;
