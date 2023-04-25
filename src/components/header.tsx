import SOCIALS from '../constants/socials';
import theme from '../styles/theme';
import styled from 'styled-components';
import HamburgerMenu from './hamburger';
import { Paragraph, ButtonAsLink, Link } from './shared';
import React from 'react';
import SCREEN_SIZES from '../constants/screenSizes';
import { useDeviceContext } from '../contexts/deviceContext';

type SharedHeaderProps = {
  isMobile: boolean;
};

type HeaderProps = SharedHeaderProps & {};

const HomeIconContainer = styled.header<HeaderProps>`
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 62px;
  top: ${(props) => (props.isMobile ? '0' : '3.5%')};
  left: ${(props) => (props.isMobile ? '0' : '2.5%')};
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
  width: ${(props) => (props.isMobile ? '60px' : '75px')};
  height: ${(props) => (props.isMobile ? '45px' : '55px')};
  margin: ${(props) => (props.isMobile ? 'auto auto auto 10px' : '0 auto 0 0')};
  /* margin: 0 auto 0 0; */
  cursor: pointer;
  transition: all 0.25s linear;

  ${(props) => {
    if (props.isHovering) {
      return `
        &:hover,
        &:focus {
          box-shadow: inset 0 0 0 2em ${theme.colors.BLUE_5_TRANSPARENT},
                      0 0.5em 0.5em -0.4em ${theme.colors.ORANGE_1};
          transform: translateY(-0.25em);
        }
      `;
    } else return ``;
  }}
`;

type IconLetterProps = SharedHeaderProps & {
  color: string;
};

const HomeIconLetter = styled(Paragraph)<IconLetterProps>`
  color: ${(props) => props.color};
  transition: color 0.2s linear;
  font-size: clamp(1.5rem, 2vw, 2.2rem);
  padding: 0;
  font-weight: 900;
`;

const MobileNavContainer = styled.div`
  display: flex;
  padding: 0.5rem 0;
  background: rgb(10, 27, 32, 0.7);
  backdrop-filter: blur(5px);
`;

type MobileMenuProps = {
  isMenuOpen: boolean;
};

const MobileMenuBG = styled.div<MobileMenuProps>`
  position: fixed;
  top: 62px; // height of header
  right: 0;
  width: 100%;
  height: calc(100vh - 62px);
  background: rgb(10, 27, 32);
  overflow: hidden;
`;

const MobileMenu = styled.div<MobileMenuProps>`
  position: fixed;
  top: 62px; // height of header
  right: 0;
  width: 100%;
  width: ${(props) => (props.isMenuOpen ? '80%' : '0')};
  opacity: ${(props) => (props.isMenuOpen ? '1' : '0')};
  background: rgb(189, 86, 60, 0.8);
  height: calc(100vh - 62px);
  transition: all 0.2s linear;
`;

const MobileMenuLinkContainer = styled.div`
  /* background: lightgrey; // testing */
  margin: 0.5rem auto;
`;

const MenuLables = styled(Paragraph)`
  font-size: 1rem;
  font-weight: bolder;
  align-self: start;
`;

const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1.5rem 1rem;
`;

const MobileMenuLinkWrapper = styled.div`
  padding: 0.5rem 0;
  min-width: 125px;
  display: flex;
  align-items: center;
`;

const MobileMenuLink = styled(Link)`
  max-width: max-content;
  flex-grow: 1;
  margin: 0 auto;
`;

type MobileExternalLinkProps = {
  targetLink: string;
  targetType: string;
};

const MobileExternalLinks = styled(ButtonAsLink).attrs<MobileExternalLinkProps>(
  (props) => ({
    href: props.targetLink,
    target: props.targetType,
    download: props.targetType === '_self' ? true : false,
  })
)<MobileExternalLinkProps>`
  text-align: center;
  cursor: pointer;
  color: ${theme.colors.BLUE_1};
`;

const MenuLinkNumber = styled(Paragraph)`
  font-size: 0.75rem;
  flex-shrink: 1;
`;

const ContactLabel = styled.small`
  font-size: 0.75rem;
  font-weight: bold;
`;

const ContactLink = styled(Link)`
  text-decoration: underline;
  padding-left: 0.5rem;
`;

const ContactPhone = styled(Paragraph)`
  display: inline;
  font-size: 1rem;
  padding-left: 0.5rem;
`;

const Header = () => {
  const [isHoveringIcon, setIsHoveringIcon] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isWindowWidthAboveOrBetweenThreshold } = useDeviceContext();

  console.log('isMenuOpen', isMenuOpen);

  const isAboveMobile = isWindowWidthAboveOrBetweenThreshold(
    SCREEN_SIZES.MOBILE
  );
  console.log('isAboveMobile', isAboveMobile);
  const isMobile = !isAboveMobile;

  const fill = isHoveringIcon ? theme.colors.ORANGE_2 : theme.colors.BLUE_1;

  return (
    <HomeIconContainer id="header" isMobile={isMobile}>
      {isMobile ? (
        <MobileNavContainer>
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
          <HamburgerMenu setParentIsMenuOpen={setIsMenuOpen} />
          {isMenuOpen ? <MobileMenuBG isMenuOpen={isMenuOpen} /> : null}
          <MobileMenu isMenuOpen={isMenuOpen}>
            <MobileMenuLinkContainer>
              <MenuSection>
                <MobileMenuLinkWrapper>
                  <MenuLinkNumber>01.</MenuLinkNumber>
                  <MobileMenuLink href="#intro">Intro</MobileMenuLink>
                </MobileMenuLinkWrapper>
                <MobileMenuLinkWrapper>
                  <MenuLinkNumber>02.</MenuLinkNumber>
                  <MobileMenuLink href="#skills">Skills</MobileMenuLink>
                </MobileMenuLinkWrapper>
                <MobileMenuLinkWrapper>
                  <MenuLinkNumber>03.</MenuLinkNumber>
                  <MobileMenuLink href="#experience">Experience</MobileMenuLink>
                </MobileMenuLinkWrapper>
                <MobileMenuLinkWrapper>
                  <MenuLinkNumber>04.</MenuLinkNumber>
                  <MobileMenuLink href="#journey">Journey</MobileMenuLink>
                </MobileMenuLinkWrapper>
                <MobileMenuLinkWrapper>
                  <MenuLinkNumber>05.</MenuLinkNumber>
                  <MobileMenuLink href="#about">About</MobileMenuLink>
                </MobileMenuLinkWrapper>
              </MenuSection>

              <MenuSection>
                <MenuLables>My stuff</MenuLables>
                <MobileExternalLinks
                  targetLink={SOCIALS.linkedIn}
                  targetType="_blank"
                >
                  LinkedIn
                </MobileExternalLinks>
                <MobileExternalLinks
                  targetLink={SOCIALS.resume}
                  targetType="_self"
                >
                  Resume
                </MobileExternalLinks>
                <MobileExternalLinks
                  targetLink={SOCIALS.github}
                  targetType="_blank"
                >
                  Github
                </MobileExternalLinks>
              </MenuSection>

              <MenuSection>
                <MenuLables>Contact me</MenuLables>
                <div>
                  <ContactLabel>Email:</ContactLabel>
                  <ContactLink
                    href={`mailto:${SOCIALS.email}?subject=Hello%20Logan!`}
                  >
                    {SOCIALS.email}
                  </ContactLink>
                </div>
                <div>
                  <ContactLabel>Phone:</ContactLabel>
                  <ContactPhone>{SOCIALS.phone}</ContactPhone>
                </div>
              </MenuSection>
            </MobileMenuLinkContainer>
          </MobileMenu>
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
  );
};

export default Header;
