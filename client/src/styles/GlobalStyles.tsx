import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --main: #223444;
        --sub: #98999B;
        --primary: #1661F4;
        --primary-light: rgba(22, 97, 244, 0.1);
        --dark: #1C2326;
        --white: white;
        --danger: #ef5252;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: "Roboto", sans-serif;
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
