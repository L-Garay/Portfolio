// Step 1: Import React
import * as React from 'react';
import styled from 'styled-components';
import { useInView, defaultFallbackInView } from 'react-intersection-observer';
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
  defaultFallbackInView(true);

  const { ref: skillsRef, inView: skillsInView } = useInView({
    threshold: 0.5,
    delay: 250,
    triggerOnce: true
  });
  const { ref: experienceRef, inView: experienceInView } = useInView({
    threshold: 0.5,
    delay: 250,
    triggerOnce: true
  });
  const { ref: aboutRef, inView: aboutInView } = useInView({
    threshold: 0.5,
    delay: 250,
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
        {/* <Journey /> */}
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
