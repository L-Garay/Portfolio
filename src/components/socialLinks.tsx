import * as React from 'react';
import { useState } from 'react';
import GithubSVG from './svgs/githubSVG';
import styled from 'styled-components';
import COLORS from '../styles/color';
import SOCIALS from '../constants/socials';
import { Link } from '../components/shared';
import LinkedInSVG from './svgs/linkedInSVG';
import DownloadSVG from './svgs/downloadSVG';
import EmailSVG from './svgs/emailSVG';

const LinksContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
`;

type SocialLinkProps = {
  isHovering: boolean;
};

const LinkWrapper = styled.div<SocialLinkProps>`
  height: 40px;
  width: 40px;
  background-color: transparent; // testing
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: ${(props) => (props.isHovering ? '7px' : '0')};
  transition: padding-bottom 0.25s linear;
  &:hover {
    cursor: pointer;
  }
`;

const LinkLine = styled.div`
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
  }
`;

const SocialLink = styled(Link)``;

const SocialLinks = () => {
  const [isHoveringGithub, setIsHoveringGithub] = useState(false);
  const [isHoveringLinkedIn, setIsHoveringLinkedIn] = useState(false);
  const [isHoveringResume, setIsHoveringResume] = useState(false);
  const [isHoveringEmail, setIsHoveringEmail] = useState(false);

  const defaultColor = COLORS.ORANGE_2;
  const fillColor = COLORS.BLUE_1;

  return (
    <LinksContainer>
      <LinkWrapper
        isHovering={isHoveringGithub}
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
        onMouseEnter={() => {
          setIsHoveringResume(true);
        }}
        onMouseLeave={() => {
          setIsHoveringResume(false);
        }}
      >
        <SocialLink href="../assets/resume.pdf" download={true}>
          <DownloadSVG fill={isHoveringResume ? fillColor : defaultColor} />
        </SocialLink>
      </LinkWrapper>
      <LinkWrapper
        isHovering={isHoveringEmail}
        onMouseEnter={() => {
          setIsHoveringEmail(true);
        }}
        onMouseLeave={() => {
          setIsHoveringEmail(false);
        }}
      >
        <SocialLink href={SOCIALS.email}>
          <EmailSVG fill={isHoveringEmail ? fillColor : defaultColor} />
        </SocialLink>
      </LinkWrapper>
      <LinkLine />
    </LinksContainer>
  );
};

export default SocialLinks;
