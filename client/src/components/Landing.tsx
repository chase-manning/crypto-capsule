import React, { useState } from "react";
import styled from "styled-components";
import landing from "../assets/capsule.jpg";
import Button from "./Button";
import CreateCapsule from "./CreateCapsule";
import FloatingCapsule from "./FloatingCapsule";

const StyledLanding = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-bottom: 7rem;
`;

const Header = styled.h1`
  font-size: 17rem;
  font-weight: 700;
  color: var(--main);
  transform: rotate(-10deg) translateY(-8rem);
  height: 13rem;
  margin-left: 10rem;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75rem;
  margin-left: 4rem;
  margin-top: 20rem;
  transform: rotate(-4deg);
`;

const SubHeader = styled.div`
  color: var(--sub);
  margin-top: 25px;
  font-size: 3.3rem;
  width: 75%;
  line-height: 1.4;
  margin-bottom: 7rem;
  margin-left: 10rem;
`;

const ButtonContainer = styled.div`
  margin-bottom: 13rem;
  transform: rotate(2deg);
`;

const Landing = (): JSX.Element => {
  const [creatingCapsule, setCreatingCapsule] = useState(false);

  return (
    <StyledLanding>
      <Header>Crypto Capsule</Header>
      <Content>
        <Left>
          <SubHeader>
            Send crytocurrencies into the future, safely and securely using
            smart contracts
          </SubHeader>
          <ButtonContainer>
            <Button
              primary
              text="Create Capsule"
              click={() => setCreatingCapsule(true)}
            />
          </ButtonContainer>
        </Left>
        <FloatingCapsule />
      </Content>
      <CreateCapsule
        show={creatingCapsule}
        close={() => setCreatingCapsule(false)}
      />
    </StyledLanding>
  );
};

export default Landing;
