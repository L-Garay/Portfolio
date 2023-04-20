import styled from 'styled-components';

export type SectionProps = {
  height?: number;
}

export const Section = styled.section<SectionProps>`
  height: ${props => `${props.height}px` || '100vh'};
  width: 100%;
  background-color: black;
  color: white;
`;