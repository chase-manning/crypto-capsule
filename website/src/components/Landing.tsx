import React from "react";
import styled from "styled-components";

const StyledLanding = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 150px;
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
  margin-top: 30px;
  margin-left: 10px;
  font-size: 21px;
  width: 75%;
  line-height: 1.4;
`;

const Landing = () => {
  return (
    <StyledLanding>
      <Left>
        <Header>Crypto Capsule The Blockchain Time Capsule</Header>
        <SubHeader>
          Send crytocurrencies into the future safely and securely using
          Ethereum smart contracts
        </SubHeader>
      </Left>
      <div />
    </StyledLanding>
  );
};

export default Landing;
