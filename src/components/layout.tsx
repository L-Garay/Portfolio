import * as React from 'react';
import styled from 'styled-components';
import SocialLinks from './socialLinks';
import SiteLinks from './siteLinks';
import theme from '../styles/theme';
import { Paragraph } from './shared';

const Main = styled.main`
  position: relative;
  background-color: black;
`;

const HomeIconContainer = styled.header`
  position: fixed;
  z-index: 100;
  top: 3.5%;
  left: 2.5%;
  width: 100px;
`;

type IconLetterProps = {
  color: string;
};

const HomeIconLetter = styled(Paragraph)<IconLetterProps>`
  color: ${(props) => props.color};
  transition: color 0.2s linear;
  font-size: 2rem; // will need to clamp on device size changes
  padding: 0;
  font-weight: 900;
`;

type IconWrapperProps = {
  isHovering: boolean;
};

const IconWrapper = styled.div<IconWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${theme.colors.BLUE_1};
  border-radius: 12.5px;
  width: 75%;
  margin: 0 auto;
  cursor: pointer;

  ${(props) => {
    if (props.isHovering) {
      return `
        &:hover,
        &:focus {
          box-shadow: inset 0 0 0 2em ${theme.colors.BLUE_5_TRANSPARENT},
                      0 0.5em 0.5em -0.4em ${theme.colors.ORANGE_1};
          transform: translateY(-0.25em);
        }
        transition: all .5s linear;
      `;
    } else
      return `
      transition: all .5s linear;
    `;
  }}
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
  const [isHoveringIcon, setIsHoveringIcon] = React.useState(false);
  const fill = isHoveringIcon ? theme.colors.ORANGE_2 : theme.colors.BLUE_1;

  return (
    <>
      <HomeIconContainer id="header">
        <IconWrapper
          isHovering={isHoveringIcon}
          onMouseEnter={() => setIsHoveringIcon(true)}
          onMouseLeave={() => setIsHoveringIcon(false)}
        >
          <HomeIconLetter color={fill}>L</HomeIconLetter>
          <HomeIconLetter color={fill}>G</HomeIconLetter>
        </IconWrapper>
      </HomeIconContainer>
      <Main id="main">
        <SocialLinks />
        {children}
        <SiteLinks />
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
