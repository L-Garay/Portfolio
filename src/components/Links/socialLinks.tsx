import * as React from 'react';
import { useState } from 'react';
import GithubSVG from '../svgs/githubSVG';
import styled from 'styled-components';
import theme from '../../styles/theme';
import SOCIALS from '../../constants/socials';
import { Link } from '../shared';
import LinkedInSVG from '../svgs/linkedInSVG';
import DownloadSVG from '../svgs/downloadSVG';
import EmailSVG from '../svgs/emailSVG';
import { useIntroContext } from '../../contexts/introContext';

const LinksContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
`;

type WrapperProps = {
  isHovering: boolean;
  transformDelay: number;
} & IntroProps;

const LinkWrapper = styled.div<WrapperProps>`
  height: 40px;
  width: 40px;
  background-color: transparent; // testing
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: ${(props) => (props.isHovering ? '7px' : '0')};
  transition: padding-bottom 0.25s linear;
  opacity: ${({ hasSeenIntro }) => (hasSeenIntro ? '1' : '0')};
  transform: ${({ hasSeenIntro }) =>
    hasSeenIntro ? 'translateX(0)' : 'translateX(-50px)'};
  transition: opacity, transform, padding-bottom;
  transition-duration: 0.5s, 0.35s, 0.25s;
  transition-timing-function: linear;
  transition-delay: ${({ transformDelay }) => `.75s, ${transformDelay}s, 0s`};

  &:hover {
    cursor: pointer;
  }
`;

type IntroProps = {
  hasSeenIntro: boolean;
};

const LinkLine = styled.div<IntroProps>`
  height: 100px;
  width: 50px;
  background-color: transparent;
  position: relative;
  margin: 0 10px;

  &:after {
    content: '';
    position: absolute;
    left: 50%;
    border-left: 1px solid white;
    background-color: white;
    height: 100%;
    transform: translateX(-50%);
    opacity: ${({ hasSeenIntro }) => (hasSeenIntro ? '1' : '0')};
    transform: ${({ hasSeenIntro }) => {
      if (hasSeenIntro) {
        return 'translateX(-50%) translateY(0)';
      } else {
        return 'translateX(-50%) translateY(75px)';
      }
    }};
    transition: opacity, transform;
    transition-duration: 0.5s;
    transition-timing-function: linear;
    transition-delay: 0.75s;
  }
`;

const SocialLink = styled(Link)``;

const SocialLinks = () => {
  const { hasSeenIntro } = useIntroContext();

  const [isHoveringGithub, setIsHoveringGithub] = useState(false);
  const [isHoveringLinkedIn, setIsHoveringLinkedIn] = useState(false);
  const [isHoveringResume, setIsHoveringResume] = useState(false);
  const [isHoveringEmail, setIsHoveringEmail] = useState(false);

  const defaultColor = theme.colors.ORANGE_2;
  const fillColor = theme.colors.BLUE_1;

  return (
    <LinksContainer>
      <LinkWrapper
        isHovering={isHoveringGithub}
        hasSeenIntro={hasSeenIntro}
        transformDelay={1.75}
        onMouseEnter={() => {
          setIsHoveringGithub(true);
        }}
        onMouseLeave={() => {
          setIsHoveringGithub(false);
        }}
      >
        <SocialLink href={SOCIALS.github} target="_blank">
          <GithubSVG fill={isHoveringGithub ? fillColor : defaultColor} />
        </SocialLink>
      </LinkWrapper>
      <LinkWrapper
        isHovering={isHoveringLinkedIn}
        hasSeenIntro={hasSeenIntro}
        transformDelay={1.5}
        onMouseEnter={() => {
          setIsHoveringLinkedIn(true);
        }}
        onMouseLeave={() => {
          setIsHoveringLinkedIn(false);
        }}
      >
        <SocialLink href={SOCIALS.linkedIn} target="_blank">
          <LinkedInSVG fill={isHoveringLinkedIn ? fillColor : defaultColor} />
        </SocialLink>
      </LinkWrapper>
      <LinkWrapper
        isHovering={isHoveringResume}
        hasSeenIntro={hasSeenIntro}
        transformDelay={1.25}
        onMouseEnter={() => {
          setIsHoveringResume(true);
        }}
        onMouseLeave={() => {
          setIsHoveringResume(false);
        }}
      >
        <SocialLink href={SOCIALS.resume} download={true}>
          <DownloadSVG fill={isHoveringResume ? fillColor : defaultColor} />
        </SocialLink>
      </LinkWrapper>
      <LinkWrapper
        isHovering={isHoveringEmail}
        hasSeenIntro={hasSeenIntro}
        transformDelay={1}
        onMouseEnter={() => {
          setIsHoveringEmail(true);
        }}
        onMouseLeave={() => {
          setIsHoveringEmail(false);
        }}
      >
        <SocialLink href={`mailto:${SOCIALS.email}?subject=Hello%20Logan!`}>
          <EmailSVG fill={isHoveringEmail ? fillColor : defaultColor} />
        </SocialLink>
      </LinkWrapper>
      <LinkLine hasSeenIntro={hasSeenIntro} />
    </LinksContainer>
  );
};

export default SocialLinks;
