import { createGlobalStyle } from 'styled-components'

// Global Styles - Fonts, Box-sizing
export default createGlobalStyle`
    @font-face {
        font-family: 'TheJamsil1Thin';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/TheJamsil1Thin.woff2') format('woff2');
        font-weight: 300;
        font-style: normal;
    }
    @font-face {
        font-family: 'TheJamsil3Regular';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/TheJamsil3Regular.woff2') format('woff2');
        font-weight: 500;
        font-style: normal;
    }
    @font-face {
        font-family: 'TheJamsil5Bold';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/TheJamsil5Bold.woff2') format('woff2');
        font-weight: 700;
        font-style: normal;
    }

    * {
        box-sizing: border-box;
    }
`
