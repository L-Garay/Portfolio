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

const TestLink = styled.div`
  height: 50px;
  width: 50px;
  background-color: transparent; // testing
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
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

const SocialLinks = () => {
  const [isHoveringGithub, setIsHoveringGithub] = useState(false);
  const [isHoveringLinkedIn, setIsHoveringLinkedIn] = useState(false);
  const [isHoveringResume, setIsHoveringResume] = useState(false);
  const [isHoveringEmail, setIsHoveringEmail] = useState(false);

  const defaultColor = COLORS.ORANGE_2;
  const fillColor = COLORS.BLUE_1;

  return (
    <LinksContainer>
      <TestLink>
        <Link
          href={SOCIALS.github}
          onMouseEnter={() => {
            setIsHoveringGithub(true);
          }}
          onMouseLeave={() => {
            setIsHoveringGithub(false);
          }}
        >
          <GithubSVG fill={isHoveringGithub ? fillColor : defaultColor} />
        </Link>
      </TestLink>
      <TestLink>
        <Link
          href={SOCIALS.linkedIn}
          onMouseEnter={() => {
            setIsHoveringLinkedIn(true);
          }}
          onMouseLeave={() => {
            setIsHoveringLinkedIn(false);
          }}
        >
          <LinkedInSVG fill={isHoveringLinkedIn ? fillColor : defaultColor} />
        </Link>
      </TestLink>
      <TestLink>
        <Link
          href="../assets/resume.pdf"
          download={true}
          onMouseEnter={() => {
            setIsHoveringResume(true);
          }}
          onMouseLeave={() => {
            setIsHoveringResume(false);
          }}
        >
          <DownloadSVG fill={isHoveringResume ? fillColor : defaultColor} />
        </Link>
      </TestLink>
      <TestLink>
        <Link
          href={SOCIALS.email}
          onMouseEnter={() => {
            setIsHoveringEmail(true);
          }}
          onMouseLeave={() => {
            setIsHoveringEmail(false);
          }}
        >
          <EmailSVG fill={isHoveringEmail ? fillColor : defaultColor} />
        </Link>
      </TestLink>
      <LinkLine />
    </LinksContainer>
  );
};

export default SocialLinks;
