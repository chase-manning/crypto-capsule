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

const Landing = () => {
  return (
    <StyledLanding>
      <Left>
        <Header>Crypto Capsule the Blockchain Time Capsule</Header>
      </Left>
      <div />
    </StyledLanding>
  );
};

export default Landing;
