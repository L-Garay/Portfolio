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
  margin: ${(props) => (props.isMobile ? '0 1.5rem' : '0 auto')};
  min-width: 325px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
