import { SectionProps, SectionContentProps } from '../constants/sharedTypes';
import styled from 'styled-components';

export const Section = styled.section<SectionProps>`
  height: ${(props) => (props.height ? `${props.height}px` : '100vh')};
  color: white;
  border-bottom: 1px solid white; // testing
`;

export const SectionContent = styled.div.attrs<SectionContentProps>(
  (props) => ({
    style: {
      maxWidth: `${props.calculatedWidth}px`,
    },
  })
)<SectionContentProps>`
  height: 100%;
  margin: 0 auto;
  min-width: 200px; // min-width for mobile (still TBD)
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
