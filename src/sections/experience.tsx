import * as React from 'react';
import styled from 'styled-components';
import { Section, SectionContent } from '../components/shared/sections';

const Experience = () => {
  // TODO: use context and provider to pass window height and width to all sections
  const [windowHeight, setWindowHeight] = React.useState(0);
  const [windowWidth, setWindowWidth] = React.useState(0);

  React.useEffect(() => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
  }, []);

  return (
    <Section id="experience" height={windowHeight}>
      <SectionContent width={windowWidth - 200}>
        <h1 style={{ margin: 0 }}>Experience section</h1>
      </SectionContent>
    </Section>
  );
};

export default Experience;
