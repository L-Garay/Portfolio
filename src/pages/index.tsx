// Step 1: Import React
import * as React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import Introduction from '../sections/introduction';
import GlobalStyle from '..//styles/global';
import Journey from '../sections/journey';
import About from '../sections/about';
import Experience from '../sections/experience';
import Skills from '../sections/skills';
import { CarouselProvider } from '../contexts/carouselContext';
import AnimatedIntro from '../components/animatedIntro';

// Step 2: Define your component
const IndexPage = () => {
  return (
    <div style={{ position: 'relative' }}>
      <GlobalStyle />
      <AnimatedIntro />
      <Layout>
        <Introduction />
        <Skills />
        <Experience />
        {/* <Journey /> */}
        <CarouselProvider>
          <About />
        </CarouselProvider>
      </Layout>
    </div>
  );
};

// You'll learn about this in the next task, just copy it for now
export const Head = () => {
  return (
    <>
      <html lang="eng" />
      <body id="body" />
      <title key={'test'}>Logan Garay Web Dev</title>
    </>
  );
};

// Step 3: Export your component
export default IndexPage;
