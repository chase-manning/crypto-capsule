import React from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import Landing from "./Landing";

const StyledHomePage = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HomePage = () => {
  return (
    <StyledHomePage>
      <Header />
      <Landing />
      <Footer />
    </StyledHomePage>
  );
};

export default HomePage;
