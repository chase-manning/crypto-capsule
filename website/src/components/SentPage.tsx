import React from "react";
import styled from "styled-components";
import Header from "./Header";

const StyledSentPage = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const SentPage = () => {
  return (
    <StyledSentPage>
      <Header />
      meow
    </StyledSentPage>
  );
};

export default SentPage;
