import styled from 'styled-components';

export type SectionProps = {
  height?: number;
};

export type SectionContentProps = {
  width: number;
};

export const Section = styled.section<SectionProps>`
  height: ${(props) => `${props.height}px` || '100vh'};
  width: 100%;
  color: white;
  border-bottom: 1px solid white; // testing
`;

export const SectionContent = styled.div<SectionContentProps>`
  height: 100%;
  width: ${(props) => `${props.width}px`};
  margin: 0 auto;
  min-width: 200px; // min-width for mobile (still TBD)
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
