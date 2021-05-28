import React, { useState } from "react";
import styled from "styled-components";
import landing from "../assets/capsule.jpg";
import Button from "./Button";
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
  width: 700px;
  margin-left: 4rem;
`;

const Header = styled.h1`
  font-size: 11rem;
  font-weight: 700;
  color: var(--main);
  transform: rotate(-6deg);
  margin-bottom: 2rem;
`;

const SubHeader = styled.div`
  color: var(--sub);
  margin-top: 25px;
  margin-bottom: 35px;
  margin-left: 12rem;
  font-size: 3rem;
  width: 75%;
  line-height: 1.4;
  transform: rotate(-6deg);
  margin-bottom: 14rem;
`;

const ButtonContainer = styled.div`
  margin-left: 30rem;
  transform: rotate(-6deg);
`;

const Image = styled.img`
  width: 53vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  color: var(--main);
  text-transform: uppercase;
  user-drag: none;
  user-select: none;
`;

const Landing = (): JSX.Element => {
  const [creatingCapsule, setCreatingCapsule] = useState(false);

  return (
    <StyledLanding>
      <Left>
        <Header>Crypto Capsule</Header>
        <SubHeader>
          Send crytocurrencies into the future, safely and securely using
          Ethereum smart contracts
        </SubHeader>
        <ButtonContainer>
          <Button
            primary
            text="Create Capsule"
            click={() => setCreatingCapsule(true)}
          />
        </ButtonContainer>
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
