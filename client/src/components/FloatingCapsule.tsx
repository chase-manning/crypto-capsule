import React from "react";
import styled from "styled-components";

import capsuleLandingMain from "../assets/capsule-landing-main.png";
import capsuleLandingShadow from "../assets/capsule-landing-shadow.png";
import capsuleLandingTokenCapsuleCoin from "../assets/capsule-landing-token-capsule-coin.png";
import capsuleLandingTokenEther from "../assets/capsule-landing-token-ether.png";
import capsuleLandingTokenBitcoin from "../assets/capsule-landing-token-bitcoin.png";
import capsuleLandingTokenTether from "../assets/capsule-landing-token-tether.png";
import capsuleLandingTokenChainlink from "../assets/capsule-landing-token-chainlink.png";

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

const TokenCapsuleCoin = styled.img`
  position: absolute;
  top: 21.5%;
  left: 14.6%;
  width: 14.5%;
  user-drag: none;
  user-select: none;
`;

const TokenBitcoin = styled.img`
  position: absolute;
  top: 16%;
  left: 30.5%;
  width: 11%;
  user-drag: none;
  user-select: none;
`;

const TokenEther = styled.img`
  position: absolute;
  top: 23.7%;
  left: 44.7%;
  width: 11%;
  user-drag: none;
  user-select: none;
`;

const TokenTether = styled.img`
  position: absolute;
  top: 11%;
  left: 57.7%;
  width: 11%;
  user-drag: none;
  user-select: none;
`;

const TokenChainlink = styled.img`
  position: absolute;
  top: 18.5%;
  left: 71%;
  width: 11%;
  user-drag: none;
  user-select: none;
`;

const FloatingCapsule = (): JSX.Element => {
  return (
    <StyledFloatingCapsule>
      <Main src={capsuleLandingMain} />
      <Shadow src={capsuleLandingShadow} />
      <TokenCapsuleCoin src={capsuleLandingTokenCapsuleCoin} />
      <TokenEther src={capsuleLandingTokenEther} />
      <TokenBitcoin src={capsuleLandingTokenBitcoin} />
      <TokenTether src={capsuleLandingTokenTether} />
      <TokenChainlink src={capsuleLandingTokenChainlink} />
    </StyledFloatingCapsule>
  );
};

export default FloatingCapsule;
