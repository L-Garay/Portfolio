import * as React from 'react';
import styled from 'styled-components';
import { SocialLinks, SiteLinks } from './Links';
import { useDeviceContext } from '../contexts/deviceContext';
import SCREEN_SIZES from '../constants/screenSizes';
import { Header } from './Header';
import { useIntroContext } from '../contexts/introContext';

type MainProps = {
  hasSeenIntro: boolean;
  shouldSkipIntro: boolean;
};

const Main = styled.main<MainProps>`
  position: relative;
  background-color: black;
  visibility: ${({ hasSeenIntro, shouldSkipIntro }) => {
    if (hasSeenIntro || shouldSkipIntro) {
      return 'visible';
    } else {
      return 'hidden';
    }
  }};
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
  const { isWindowWidthAboveOrBetweenThreshold } = useDeviceContext();
  const isAboveSmall = isWindowWidthAboveOrBetweenThreshold(SCREEN_SIZES.SMALL);

  const { hasSeenIntro, shouldSkipIntro } = useIntroContext();

  return (
    <>
      <Header />
      <Main
        id="main"
        hasSeenIntro={hasSeenIntro}
        shouldSkipIntro={shouldSkipIntro}
      >
        {isAboveSmall ? <SocialLinks /> : null}
        {children}
        {isAboveSmall ? <SiteLinks /> : null}
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
