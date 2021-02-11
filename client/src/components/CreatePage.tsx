import React from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import Landing from "./Landing";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";

const StyledCreatePage = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

type Props = {
  web3?: Web3;
  capsuleFactory?: Contract;
};
const CreatePage = (props: Props) => {
  return (
    <StyledCreatePage>
      <Header />
      <Landing web3={props.web3} capsuleFactory={props.capsuleFactory} />
      <Footer />
    </StyledCreatePage>
  );
};

export default CreatePage;
