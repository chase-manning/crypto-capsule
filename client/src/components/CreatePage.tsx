import React from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import Landing from "./Landing";

const StyledCreatePage = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const CreatePage = () => {
  return (
    <StyledCreatePage>
      <Header />
      <Landing />
      <Footer />
    </StyledCreatePage>
  );
};

export default CreatePage;
