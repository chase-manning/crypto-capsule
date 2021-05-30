import React from "react";
import styled from "styled-components";

import capsuleLandingMain from "../assets/capsule-landing-main.png";

const StyledFloatingCapsule = styled.div`
  position: relative;
  width: 56vw;
  height: 30vw;
  border: solid 1px pink;
`;

const Main = styled.img`
  position: absolute;
  left: 5%;
  width: 90%;
  user-drag: none;
  user-select: none;
`;

const FloatingCapsule = (): JSX.Element => {
  return (
    <StyledFloatingCapsule>
      <Main src={capsuleLandingMain} />
    </StyledFloatingCapsule>
  );
};

export default FloatingCapsule;
