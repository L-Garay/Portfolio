import * as React from 'react';
import styled from 'styled-components';

// This layout will be solely responsible for the 'home' icon in the top left corner
// it will also be responsible for the two vertical links/menus on either side of the page
// the one on the left will be the links to different sites (github, linkedin, etc)
// the one on the right will be the site navigation (home, about, skills, etc)
// since all three of those should be visible no matter what section you are on, they should be in the layout

const Main = styled.main`
  position: relative;
  background-color: black;
`;

const HomeIconContainer = styled.header`
  position: fixed;
  z-index: 100;
  top: 3.5%;
  left: 2.5%;
  padding: 10px;
  background-color: red; // testing
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomeIcon = styled.a`
  text-decoration: none;
  color: white;
`;

const SocialLinks = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
`;

const SiteLinks = styled.div`
  position: fixed;
  bottom: 35%;
  right: 0;
`;

const SiteLinkContainer = styled.div`
  height: 50px;
  width: 50px; // will expand out on hover to fit name of section
  margin: 10px;
  background-color: red; // testing
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SiteLink = styled.a`
  text-decoration: none;
  color: white;

  &:hover {
    cursor: pointer;
    color: black;
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

const TestLink = styled.div`
  height: 50px;
  width: 50px;
  background-color: red; // testing
  margin: 10px;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 75px; // will need to change on device size
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Layout = ({ pageTitle, children }: Record<string, any>) => {
  return (
    <>
      <HomeIconContainer id="header">
        <HomeIcon href="#home">Home</HomeIcon>
      </HomeIconContainer>
      <Main id="main">
        <SocialLinks>
          <TestLink></TestLink>
          <TestLink></TestLink>
          <TestLink></TestLink>
          <LinkLine />
        </SocialLinks>
        {children}
        <SiteLinks>
          <SiteLinkContainer>
            <SiteLink href="#introduction">01</SiteLink>
          </SiteLinkContainer>
          <SiteLinkContainer>
            <SiteLink href="#skills">02</SiteLink>
          </SiteLinkContainer>
          <SiteLinkContainer>
            <SiteLink href="#experience">03</SiteLink>
          </SiteLinkContainer>
          <SiteLinkContainer>
            <SiteLink href="#journey">04</SiteLink>
          </SiteLinkContainer>
          <SiteLinkContainer>
            <SiteLink href="#about">05</SiteLink>
          </SiteLinkContainer>
        </SiteLinks>
        <Footer id="footer" role="contentinfo">
          <div className="footer-content">
            <small>copyright Logan Garay</small>
          </div>
        </Footer>
      </Main>
    </>
  );
};

export default Layout;
