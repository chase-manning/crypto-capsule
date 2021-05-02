import React from "react";
import styled from "styled-components";
import Landing from "./Landing";

const StyledHomePage = styled.div`
  display: flex;
  flex-direction: column;
`;

const HomePage = (): JSX.Element => {
  return (
    <StyledHomePage>
      <Landing />
    </StyledHomePage>
  );
};

export default HomePage;
