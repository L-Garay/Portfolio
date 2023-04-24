import * as React from 'react';
import styled from 'styled-components';
import SocialLinks from './socialLinks';
import SiteLinks from './siteLinks';
import theme from '../styles/theme';
import { Paragraph } from './shared';
import { useDeviceContext } from '../contexts/deviceContext';
import SCREEN_SIZES from '../constants/screenSizes';

const Main = styled.main`
  position: relative;
  background-color: black;
`;

type SharedHeaderProps = {
  isMobile: boolean;
};

type HeaderProps = SharedHeaderProps & {};

const HomeIconContainer = styled.header<HeaderProps>`
  position: fixed;
  z-index: 100;
  width: 100%;
  top: ${(props) => (props.isMobile ? '0' : '3.5%')};
  left: ${(props) => (props.isMobile ? '0' : '2.5%')};
`;

type IconLetterProps = SharedHeaderProps & {
  color: string;
};

const HomeIconLetter = styled(Paragraph)<IconLetterProps>`
  color: ${(props) => props.color};
  transition: color 0.2s linear;
  font-size: 2rem; // will need to clamp on device size changes
  padding: 0;
  font-weight: 900;
`;

type IconWrapperProps = SharedHeaderProps & {
  isHovering: boolean;
};

const IconWrapper = styled.div<IconWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${theme.colors.BLUE_1};
  border-radius: 12.5px;
  width: 75px;
  margin: 0 auto 0 0;
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
        transition: all .25s linear;
      `;
    } else
      return `
      transition: all .25s linear;
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

const MobileNavContainer = styled.div`
  display: flex;
  border-bottom: 2px solid ${theme.colors.ORANGE_1};
  padding: 0.5rem 0;
  background: lightgrey; //testing
`;

type HamburgerProps = {
  isHoveringHamburger: boolean;
  isMenuOpen: boolean;
};

const HamburgerMenu = styled.div`
  background-color: lightgrey; //testing
  width: 25%;
  display: flex;
  justify-content: center;
`; // TODO add id="mobile-nav" to this

const HamburgerButton = styled.button.attrs({
  type: 'button',
  ariaControls: 'mobile-nav',
})`
  background: red; //testing
  border-radius: 12.5px;
  border: 5px solid;
  overflow: hidden;
`; // TODO add aria-expanded={isMobileNavOpen} to this for accessibility

const HamburgerSVG = styled.svg.attrs({
  viewBox: '-10 -10 120 120',
})<HamburgerProps>`
  width: 50px;
  fill: none;
  stroke: black; //testing
  transition: translate 0.5s, rotate 0.5s;
  translate: ${(props) => (props.isMenuOpen ? '2.5px 0px;' : '0px 2.5px;')};
  rotate: ${(props) => (props.isMenuOpen ? '0.125turn;' : ';')};
`;

const SVGPath = styled.path.attrs({
  d: 'm 20 40 h 60 a 1 1 0 0 1 0 20 h -60 a 1 1 0 0 1 0 -40 h 30 v 70',
})<HamburgerProps>`
  stroke-width: 10;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: 0.5s;
  stroke-dasharray: ${(props) =>
    props.isMenuOpen ? '60 105 60 300;' : '60 31 60 300;'};
  stroke-dashoffset: ${(props) => (props.isMenuOpen ? '-90;' : ';')};
`;

const Layout = ({ pageTitle, children }: Record<string, any>) => {
  const [isHoveringIcon, setIsHoveringIcon] = React.useState(false);
  const [isHoveringHamburger, setIsHoveringHamburger] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  // console.log('isMenuOpen', isMenuOpen);
  const { windowWidth, windowHeight, isWindowWidthAboveOrBetweenThreshold } =
    useDeviceContext();

  const isAboveMobile = isWindowWidthAboveOrBetweenThreshold(
    SCREEN_SIZES.MOBILE
  );
  console.log('isAboveMobile', isAboveMobile);
  const isMobile = !isAboveMobile;

  const fill = isHoveringIcon ? theme.colors.ORANGE_2 : theme.colors.BLUE_1;

  return (
    <>
      <HomeIconContainer id="header" isMobile={isMobile}>
        {isMobile ? (
          <MobileNavContainer>
            {/* this will be the mobile header, an actual header with burger menu for section links, buttons for resume and email and icon */}
            <IconWrapper
              isMobile={isMobile}
              isHovering={isHoveringIcon}
              onMouseEnter={() => setIsHoveringIcon(true)}
              onMouseLeave={() => setIsHoveringIcon(false)}
            >
              <HomeIconLetter isMobile={isMobile} color={fill}>
                L
              </HomeIconLetter>
              <HomeIconLetter isMobile={isMobile} color={fill}>
                G
              </HomeIconLetter>
            </IconWrapper>
            <HamburgerMenu>
              <HamburgerButton
                onMouseEnter={() => setIsHoveringHamburger(true)}
                onMouseLeave={() => setIsHoveringHamburger(false)}
                onClick={() => setIsMenuOpen((prev) => !prev)}
              >
                <HamburgerSVG
                  isHoveringHamburger={isHoveringHamburger}
                  isMenuOpen={isMenuOpen}
                >
                  <SVGPath
                    isMenuOpen={isMenuOpen}
                    isHoveringHamburger={isHoveringHamburger}
                  ></SVGPath>
                </HamburgerSVG>
              </HamburgerButton>
            </HamburgerMenu>
          </MobileNavContainer>
        ) : (
          <IconWrapper
            isMobile={isMobile}
            isHovering={isHoveringIcon}
            onMouseEnter={() => setIsHoveringIcon(true)}
            onMouseLeave={() => setIsHoveringIcon(false)}
          >
            <HomeIconLetter isMobile={isMobile} color={fill}>
              L
            </HomeIconLetter>
            <HomeIconLetter isMobile={isMobile} color={fill}>
              G
            </HomeIconLetter>
          </IconWrapper>
        )}
      </HomeIconContainer>
      <Main id="main">
        {isMobile ? null : <SocialLinks />}
        {children}
        {isMobile ? null : <SiteLinks />}
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
