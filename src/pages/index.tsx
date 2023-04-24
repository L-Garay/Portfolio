// Step 1: Import React
import * as React from 'react';
import Layout from '../components/layout';
import Introduction from '../sections/introduction';
import GlobalStyle from '..//styles/global';
import Journey from '../sections/journey';
import About from '../sections/about';
import Experience from '../sections/experience';
import Skills from '../sections/skills';
import { DeviceProvider } from '../contexts/deviceContext';

// Step 2: Define your component
const IndexPage = () => {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Introduction />
        <Skills />
        <Experience />
        <Journey />
        <About />
      </Layout>
    </>
  );
};

// You'll learn about this in the next task, just copy it for now
export const Head = () => <title>Logan Garay Web Dev</title>;

// Step 3: Export your component
export default IndexPage;
