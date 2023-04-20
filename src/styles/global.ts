import { createGlobalStyle } from "styled-components";

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
    height: 100%;
  }

  body {
    margin: 0;
    height: 100%;
  }
`;

export default GlobalStyle;