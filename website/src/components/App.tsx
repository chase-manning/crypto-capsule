import React from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import Landing from "./Landing";

const StyledApp = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const App = () => {
  return (
    <StyledApp>
      <Header />
      <Landing />
      <Footer />
    </StyledApp>
  );
};

export default App;
