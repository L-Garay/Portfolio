import * as React from 'react';
import styled from 'styled-components';
import SocialLinks from './socialLinks';
import SiteLinks from './siteLinks';
import { useDeviceContext } from '../contexts/deviceContext';
import SCREEN_SIZES from '../constants/screenSizes';
import Header from './header';

const Main = styled.main`
  position: relative;
  background-color: black;
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

// TODO list
// 3. fix style 'bug' where the content/text should expand on mobile-desktop (when the user manually shrinks desktop window size down to mobile breakpoints) but then shrink on actual-mobile (mobile device emulation)
// 5. update styling altogether

const Layout = ({ pageTitle, children }: Record<string, any>) => {
  const { isWindowWidthAboveOrBetweenThreshold } = useDeviceContext();
  const isAboveMobile = isWindowWidthAboveOrBetweenThreshold(
    SCREEN_SIZES.MOBILE
  );
  const isMobile = !isAboveMobile;

  return (
    <>
      <Header />
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
