// globalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font: normal normal normal 16px/22px 'Open Sans', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        letter-spacing: 0;
        color: #303233;
        font-weight: 300;
        background-color: #fff;
        opacity: 1;
    }
`;

export default GlobalStyle;
