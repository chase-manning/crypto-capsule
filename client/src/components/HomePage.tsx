import React from "react";
import styled from "styled-components";
import Landing from "./Landing";
import Slider from "./Slider";

const StyledHomePage = styled.div`
  display: flex;
  flex-direction: column;
`;

const HomePage = (): JSX.Element => {
  return (
    <StyledHomePage>
      <Landing />
      <Slider />
    </StyledHomePage>
  );
};

export default HomePage;
