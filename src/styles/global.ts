import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
  *, 
  *::before, 
  *::after {
    box-sizing: inherit;
    font-family: Karla, sans-serif;
  }
  
  html {
    box-sizing: border-box;
    font-family: Karla, sans-serif;
    scroll-behavior: smooth;
    scrollbar-color: ${theme.colors.BLUE_1} grey;
    scrollbar-width: thin;
  }

  body {
    margin: 0;
    ::-webkit-scrollbar {
      background-color: grey;
      width: 8px;
      height: 8px;
    };
    ::-webkit-scrollbar-thumb {
      background: ${theme.colors.BLUE_1};
    }
  }
`;

export default GlobalStyle;
