import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --main: #223444;
        --sub: #98999B;
        --primary: #1661F4;
        --dark: #1C2326;
        --white: white;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: "Roboto", sans-serif;
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

const GlobalStyles = () => {
  return <GlobalStyle />;
};

export default GlobalStyles;
