import { SectionProps, SectionContentProps } from '../constants/sharedTypes';
import styled from 'styled-components';
import theme from '../styles/theme';

export const Section = styled.section<SectionProps>`
  min-height: ${(props) => (props.height ? `${props.height}px` : '100vh')};
  color: white;
  border-bottom: 1px solid white; // testing
  display: flex;
  align-items: center;
`;

export const SectionContent = styled.div.attrs<SectionContentProps>(
  (props) => ({
    style: {
      maxWidth: `${props.calculatedWidth}px`,
    },
  })
)<SectionContentProps>`
  height: 100%;
  /* margin: ${(props) => (props.isMobile ? '0 1.5rem' : '0 auto')}; */
  margin: 0 auto;
  min-width: 325px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SectionTitleContainer = styled.div`
  /* background: lightblue; //testing */
  margin: 30px 0 60px 0;
`;

export const SectionTitle = styled.h3`
  /* font-size: 2rem; */
  font-size: clamp(1.3rem, 5vw, 2rem);
  font-family: ${theme.fonts.robotoMono};
  color: ${theme.colors.ORANGE_1};
`;
