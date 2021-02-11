import React, { useState } from "react";
import styled from "styled-components";
import Web3 from "web3";
import Button from "../styles/Button";
import CreateCapsule from "./CreateCapsule";
import { Contract } from "web3-eth-contract";

const StyledLanding = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 150px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
`;

const Header = styled.h1`
  font-size: 80px;
  font-weight: 700;
  color: var(--main);
`;

const SubHeader = styled.div`
  color: var(--sub);
  margin-top: 25px;
  margin-bottom: 35px;
  margin-left: 10px;
  font-size: 21px;
  width: 75%;
  line-height: 1.4;
`;

type Props = {
  web3?: Web3;
  capsuleFactory?: Contract;
};

const Landing = (props: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <StyledLanding>
      <Left>
        <Header>Crypto Capsule The Blockchain Time Capsule</Header>
        <SubHeader>
          Send crytocurrencies into the future safely and securely using
          Ethereum smart contracts
        </SubHeader>
        <div>
          <Button onClick={() => setOpen(true)} primary>
            Create Capsule
          </Button>
        </div>
      </Left>
      <div />
      <CreateCapsule
        web3={props.web3}
        capsuleFactory={props.capsuleFactory}
        open={open}
        close={() => setOpen(false)}
      />
    </StyledLanding>
  );
};

export default Landing;
