import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --main: #5268A1;
        --sub: #82B4D1;
        --primary: #D796D3;
        --primary-light: rgba(22, 97, 244, 0.1);
        --dark: #5268A1;
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
