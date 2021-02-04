import React from "react";
import styled from "styled-components";
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
    </StyledApp>
  );
};

export default App;
