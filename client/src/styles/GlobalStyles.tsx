import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --main: #5268A1;
        --sub: #82B4D1;
        --primary: rgb(215, 151, 211);
        --primary-light: rgba(215, 150, 211, 0.1);
        --primary-shadow: rgba(215, 150, 211, 0.6);
        --dark: #5268A1;
        --bg: #F8F2F2;
        --danger: #ef5252;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      /* font-family: 'Audiowide', cursive; */
      font-family: 'Reenie Beanie', cursive;
      /* font-family: 'Indie Flower', cursive; */
      /* font-family: 'Caveat', cursive; */
      font-size: 10px;
    }
  
    button {
      background: none;
      border: none;
      outline: none;
    }

    a{
        text-decoration: none;
    }
  `;

const GlobalStyles = (): JSX.Element => {
  return <GlobalStyle />;
};

export default GlobalStyles;
