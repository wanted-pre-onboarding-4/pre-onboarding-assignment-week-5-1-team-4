import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
   * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Spoqa Han Sans Neo',-apple-system,'BlinkMacSystemFont','Apple SD Gothic Neo','Inter','Segoe UI',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'
   }
   body {
    padding: 0;
    margin: 0;
   }
   a {
    text-decoration: none;
    color: inherit;
   }
   input {
       border: none;
   }
 `;

export default GlobalStyle;
