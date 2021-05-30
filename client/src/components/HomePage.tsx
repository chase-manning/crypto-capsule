import React from "react";
import styled from "styled-components";
import Landing from "./Landing";
import WhatIsSlide from "./WhatIsSlide";
import WhyUseSlide from "./WhyUseSlide";

const StyledHomePage = styled.div`
  display: flex;
  flex-direction: column;
`;

const HomePage = (): JSX.Element => {
  return (
    <StyledHomePage>
      <Landing />
      <WhatIsSlide />
      <WhyUseSlide />
    </StyledHomePage>
  );
};

export default HomePage;
