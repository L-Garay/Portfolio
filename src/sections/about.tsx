import * as React from 'react';
import styled from 'styled-components';
import { Section, SectionContent } from '../components/shared/sections';
import { useWindowDimensions } from '../utils/hooks/useWindowDimensions';

const About = () => {
  const { windowWidth, windowHeight } = useWindowDimensions();

  return (
    <Section id="about" height={windowHeight}>
      <SectionContent width={windowWidth - 200}>
        <h1 style={{ margin: 0 }}>About section</h1>
      </SectionContent>
    </Section>
  );
};

export default About;
