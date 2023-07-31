import { createGlobalStyle } from 'styled-components'
import { reset } from 'styled-reset'
const GlobalStyle = createGlobalStyle`
 ${reset};
 
 :root {
  --color-primary: #953fff;
  --color-accent: #A9FF3F;
  --color-white: #fff;
  --color-black: #000;
  --color-bg: #f4f4f4;
  --color-gray-ddd: #ddd;
  --color-tab-active: #953fff;
 }
 
  
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    // TODO : 폰트 수정 필요
    font-family: "Helvetica", "Arial", sans-serif;
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }
`

export default GlobalStyle
