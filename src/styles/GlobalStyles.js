import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    font-family: 'Spoqa Han Sans Neo',-apple-system,'BlinkMacSystemFont','Apple SD Gothic Neo','Inter','Segoe UI',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';
  }

`;

export default GlobalStyle;
