import React from "react";
import styled from "styled-components";

import capsuleLandingMain from "../assets/capsule-landing-main.png";
import capsuleLandingShadow from "../assets/capsule-landing-shadow.png";

const StyledFloatingCapsule = styled.div`
  position: relative;
  width: 56vw;
  height: 30vw;
  border: solid 1px pink;
`;

const Main = styled.img`
  position: absolute;
  left: 7%;
  width: 83%;
  user-drag: none;
  user-select: none;
`;

const Shadow = styled.img`
  position: absolute;
  bottom: 0%;
  left: 15%;
  width: 70%;
  user-drag: none;
  user-select: none;
`;

const FloatingCapsule = (): JSX.Element => {
  return (
    <StyledFloatingCapsule>
      <Main src={capsuleLandingMain} />
      <Shadow src={capsuleLandingShadow} />
    </StyledFloatingCapsule>
  );
};

export default FloatingCapsule;
