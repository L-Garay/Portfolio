// Step 1: Import React
import * as React from 'react';
import styled from 'styled-components';
import { useInView, defaultFallbackInView } from 'react-intersection-observer';
import Layout from '../components/layout';
import Introduction from '../sections/introduction';
import GlobalStyle from '..//styles/global';
import About from '../sections/about';
import Experience from '../sections/experience';
import Skills from '../sections/skills';
import { CarouselProvider } from '../contexts/carouselContext';
import { useDeviceContext } from '../contexts/deviceContext';
import AnimatedIntro from '../components/animatedIntro';
import SCREEN_SIZES from '../constants/screenSizes';

// Step 2: Define your component
const IndexPage = () => {
  const { isWindowWidthAboveOrBetweenThreshold } = useDeviceContext();

  const isAboveSmall = isWindowWidthAboveOrBetweenThreshold(SCREEN_SIZES.SMALL);

  defaultFallbackInView(true);

  const { ref: skillsRef, inView: skillsInView } = useInView({
    threshold: isAboveSmall ? 0.5 : 0.35, // may need to tweak this
    triggerOnce: true
  });
  const { ref: experienceRef, inView: experienceInView } = useInView({
    threshold: 0.5,
    triggerOnce: true
  });
  const { ref: aboutRef, inView: aboutInView } = useInView({
    threshold: isAboveSmall ? 0.5 : 0.15, // may need to tweak this
    triggerOnce: true
  });

  return (
    <div style={{ position: 'relative' }}>
      <GlobalStyle />
      <AnimatedIntro />
      <Layout>
        <Introduction />
        <Skills ref={skillsRef} inView={skillsInView} />
        <Experience ref={experienceRef} inView={experienceInView} />
        <CarouselProvider>
          <About ref={aboutRef} inView={aboutInView} />
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
