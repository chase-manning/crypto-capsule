import React, { useState } from "react";
import styled from "styled-components";
import landing from "../assets/capsule.jpg";
import Button from "../styles/Button";
import CreateCapsule from "./CreateCapsule";

const StyledLanding = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 10rem 0;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  margin-left: 4rem;
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

const Image = styled.img`
  width: 53vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  color: var(--main);
  text-transform: uppercase;
`;

const Landing = (): JSX.Element => {
  const [creatingCapsule, setCreatingCapsule] = useState(false);

  return (
    <StyledLanding>
      <Left>
        <Header>Crypto Capsule The Blockchain Time Capsule</Header>
        <SubHeader>
          Send crytocurrencies into the future, safely and securely using
          Ethereum smart contracts
        </SubHeader>
        <div>
          <Button primary onClick={() => setCreatingCapsule(true)}>
            Create Capsule
          </Button>
        </div>
      </Left>
      <Image src={landing} />
      <CreateCapsule
        show={creatingCapsule}
        close={() => setCreatingCapsule(false)}
      />
    </StyledLanding>
  );
};

export default Landing;
