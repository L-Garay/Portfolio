import * as React from 'react';
import styled from 'styled-components';
import { SocialLinks, SiteLinks } from './Links';
import { useDeviceContext } from '../contexts/deviceContext';
import SCREEN_SIZES from '../constants/screenSizes';
import { Header } from './Header';

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
