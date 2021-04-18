import React from "react";
import styled from "styled-components";
import Button from "../styles/Button";
import { useHistory } from "react-router";

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

const Image = styled.div`
  width: 40vw;
  height: 40vh;
  background-color: lightslategray;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  color: var(--main);
  text-transform: uppercase;
`;

const Landing = () => {
  const history = useHistory();

  return (
    <StyledLanding>
      <Left>
        <Header>Crypto Capsule The Blockchain Time Capsule</Header>
        <SubHeader>
          Send crytocurrencies into the future, safely and securely using
          Ethereum smart contracts
        </SubHeader>
        <div>
          <Button onClick={() => history.push("/create")}>
            Create Capsule
          </Button>
        </div>
      </Left>
      <Image>asset 1</Image>
    </StyledLanding>
  );
};

export default Landing;
