import React from "react";
import styled from "styled-components";
import Header from "./Header";

const StyledReceivedPage = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ReceivedPage = () => {
  return (
    <StyledReceivedPage>
      <Header />
      meow
    </StyledReceivedPage>
  );
};

export default ReceivedPage;
