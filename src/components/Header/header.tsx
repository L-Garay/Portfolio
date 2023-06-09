import SOCIALS from '../../constants/socials';
import theme from '../../styles/theme';
import styled from 'styled-components';
import { Hamburger } from './';
import { Paragraph, ButtonAsLink, Link } from '../shared';
import React from 'react';
import SCREEN_SIZES from '../../constants/screenSizes';
import { useDeviceContext } from '../../contexts/deviceContext';
import preventScroll from '../../utils/preventScroll';
import { useIntroContext } from '../../contexts/introContext';
import { graphql, useStaticQuery } from 'gatsby';

// #region STYLES
type SharedHeaderProps = {
  isSmall: boolean;
};

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
  background: rgb(10, 27, 32, 0.8);
  overflow: hidden;
`;

const MobileMenu = styled.div<MobileMenuProps>`
  position: fixed;
  top: 62px; // height of header
  right: 0;
  width: 100%;
  width: ${props => (props.isMenuOpen ? '80%' : '0')};
  opacity: ${props => (props.isMenuOpen ? '1' : '0')};
  background: ${theme.colors.ORANGE_3};
  height: calc(100vh - 62px);
  transition: all 0.2s linear;
  z-index: 100;
`;

const MobileMenuContainer = styled.div`
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1.5rem 1rem;
  &:nth-of-type(3) {
    // TODO figure out if this is desired behavior
    flex-grow: 1;
    justify-content: end;
  }
`;

// --------- Internal Links ------------
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

const MenuLinkNumber = styled(Paragraph)`
  font-size: 0.75rem;
  flex-shrink: 1;
`;

// --------- External Links ------------
const MenuLables = styled(Paragraph)`
  font-size: 1rem;
  font-weight: bolder;
  align-self: start;
`;

type MobileExternalLinkProps = {
  targetLink: string;
  targetType: string;
};

const MobileExternalLinks = styled(ButtonAsLink).attrs<MobileExternalLinkProps>(
  props => ({
    href: props.targetLink,
    target: props.targetType,
    download: props.targetType === '_self' ? true : false
  })
)<MobileExternalLinkProps>`
  text-align: center;
  cursor: pointer;
  color: ${theme.colors.BLUE_1};
`;

// --------- Contact Info ------------
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

// --------- Icon ------------
const HomeIconContainer = styled.header<SharedHeaderProps>`
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 62px;
  top: ${props => (props.isSmall ? '0' : '3.5%')};
  left: ${props => (props.isSmall ? '0' : '2.5%')};
`;

type IconWrapperProps = SharedHeaderProps &
  Pick<IconProps, 'hasSeenIntro' | 'shouldSkipIntro'> & {
    isHovering: boolean;
  };

const IconWrapper = styled.div<IconWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${theme.colors.BLUE_1};
  border-radius: 12.5px;
  width: ${props => (props.isSmall ? '60px' : '75px')};
  height: ${props => (props.isSmall ? '45px' : '55px')};
  margin: ${props => (props.isSmall ? 'auto auto auto 10px' : '0 auto 0 0')};
  cursor: pointer;
  opacity: ${({ hasSeenIntro, shouldSkipIntro }) => {
    if (hasSeenIntro || shouldSkipIntro) {
      return 1;
    } else {
      return 0;
    }
  }};
  transform: ${({ hasSeenIntro, shouldSkipIntro }) => {
    if (hasSeenIntro || shouldSkipIntro) {
      return 'translateY(0)';
    } else {
      return 'translateY(-50px)';
    }
  }};
  transition: opacity, transform;
  transition-duration: 0.5s;
  transition-timing-function: linear;
  transition-delay: 0.75s;

  ${props => {
    if (props.isHovering) {
      return `
        &:hover,
        &:focus {
          box-shadow: inset 0 0 0 2em ${theme.colors.BLUE_5_TRANSPARENT},
                      0 0.5em 0.5em -0.4em ${theme.colors.ORANGE_1};
          transition: box-shadow 0.25s linear;
        }
      `;
    } else return ``;
  }}
`;

type IconLetterProps = SharedHeaderProps & {
  color: string;
};

const HomeIconLetter = styled(Paragraph)<IconLetterProps>`
  color: ${props => props.color};
  transition: color 0.2s linear;
  font-size: ${props => (props.isSmall ? '1.5rem' : '2rem')};
  padding: 0;
  font-weight: 900;
  display: inline-block;
`;

const IconLink = styled(Link)`
  width: 100%;
  text-align: center;
`;

type IconProps = {
  isSmall: boolean;
  hasSeenIntro: boolean;
  shouldSkipIntro: boolean;
};
// #endregion STYLES

const Icon = ({ isSmall, hasSeenIntro, shouldSkipIntro }: IconProps) => {
  const [isHoveringIcon, setIsHoveringIcon] = React.useState(false);

  const fill = isHoveringIcon ? theme.colors.ORANGE_2 : theme.colors.BLUE_1;

  return (
    <IconWrapper
      isSmall={isSmall}
      isHovering={isHoveringIcon}
      hasSeenIntro={hasSeenIntro}
      shouldSkipIntro={shouldSkipIntro}
      onMouseEnter={() => setIsHoveringIcon(true)}
      onMouseLeave={() => setIsHoveringIcon(false)}
    >
      <IconLink href="#introduction">
        <HomeIconLetter isSmall={isSmall} color={fill}>
          L
        </HomeIconLetter>
        <HomeIconLetter isSmall={isSmall} color={fill}>
          G
        </HomeIconLetter>
      </IconLink>
    </IconWrapper>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { hasSeenIntro, shouldSkipIntro } = useIntroContext();
  const { isWindowWidthAboveOrBetweenThreshold } = useDeviceContext();

  const isAboveSmall = isWindowWidthAboveOrBetweenThreshold(SCREEN_SIZES.SMALL);
  const isSmall = !isAboveSmall;

  React.useEffect(() => {
    if (isAboveSmall) {
      setIsMenuOpen(false);
    }
  }, [isAboveSmall]);

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
    <HomeIconContainer id="header" isSmall={isSmall}>
      {isSmall ? (
        <MobileNavContainer>
          <Icon
            isSmall={isSmall}
            hasSeenIntro={hasSeenIntro}
            shouldSkipIntro={shouldSkipIntro}
          />
          <Hamburger
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            hasSeenIntro={hasSeenIntro}
            shouldSkipIntro={shouldSkipIntro}
          />
          {isMenuOpen ? <MobileMenuBG isMenuOpen={isMenuOpen} /> : null}
          <MobileMenu isMenuOpen={isMenuOpen}>
            <MobileMenuContainer>
              {/* Site Links */}
              <MenuSection>
                {contentfulSectionTitles.map((sectionData: any) => {
                  const anchorLink = `#${sectionData.node.shortTitle.toLowerCase()}`;

                  return (
                    <MobileMenuLinkWrapper key={sectionData.node.id}>
                      <MenuLinkNumber>{sectionData.node.number}</MenuLinkNumber>
                      <MobileMenuLink
                        href={anchorLink}
                        onClick={() => {
                          setIsMenuOpen(false);
                          preventScroll(false);
                        }}
                      >
                        {sectionData.node.shortTitle}
                      </MobileMenuLink>
                    </MobileMenuLinkWrapper>
                  );
                })}
              </MenuSection>

              {/* My Stuff */}
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

              {/* Contact Info */}
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
            </MobileMenuContainer>
          </MobileMenu>
        </MobileNavContainer>
      ) : (
        <Icon
          isSmall={isSmall}
          hasSeenIntro={hasSeenIntro}
          shouldSkipIntro={shouldSkipIntro}
        />
      )}
    </HomeIconContainer>
  );
};

export default Header;
