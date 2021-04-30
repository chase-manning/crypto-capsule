import React from "react";
import styled from "styled-components";
import Header from "./Header";

const StyledAboutPage = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const AboutPage = (): JSX.Element => {
  return (
    <StyledAboutPage>
      <Header />
      meow
    </StyledAboutPage>
  );
};

export default AboutPage;
