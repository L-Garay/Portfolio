import styled from 'styled-components';
import theme from '../styles/theme';

export const Heading2 = styled.h2`
  margin: 0;
  font-size: 3.5rem;
  font-family: ${theme.fonts.robotoMono};
`;

export const Paragraph = styled.p`
  font-size: 1.25rem;
  line-height: 1.5;
  margin: 0;
  font-family: ${theme.fonts.robotoMono};
`;

export const Link = styled.a`
  font-family: ${theme.fonts.robotoMono};
  color: ${theme.colors.BLUE_1};
  text-decoration: none;
  cursor: pointer;
`;

export const ButtonAsLink = styled.button.attrs({
  as: 'a',
})`
  font-family: ${theme.fonts.robotoMono};
  border: 1px solid ${theme.colors.BLUE_1};
  border-radius: 12.5px;
  background: none;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  text-decoration: none;
`;
