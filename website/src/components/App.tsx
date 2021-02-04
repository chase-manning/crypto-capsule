import React from "react";
import styled from "styled-components";
import Header from "./Header";

const StyledApp = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const App = () => {
  return (
    <StyledApp>
      <Header />
    </StyledApp>
  );
};

export default App;
