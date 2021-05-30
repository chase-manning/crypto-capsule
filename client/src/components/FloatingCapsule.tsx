import React from "react";
import styled, { keyframes } from "styled-components";

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

const mainAnimation = keyframes`
    0% {
        transform: translateY(-3%);
    }
    50% {
        transform: translateY(3%);
    }
    100% {
        transform: translateY(-3%);
    }
`;

const MainContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: ${mainAnimation} 15s ease-in-out 0s infinite;
`;

const Main = styled.img`
  position: absolute;
  left: 7%;
  width: 83%;
  user-drag: none;
  user-select: none;
`;

const shadowAnimation = keyframes`
    0% {
        transform: translateY(9%);
    }
    50% {
        transform: translateY(-9%);
    }
    100% {
        transform: translateY(9%);
    }
`;

const Shadow = styled.img`
  position: absolute;
  bottom: 0%;
  left: 15%;
  width: 70%;
  user-drag: none;
  user-select: none;
  animation: ${shadowAnimation} 15s ease-in-out 0s infinite;
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
      <MainContainer>
        <Main src={capsuleLandingMain} />
        <TokenCapsuleCoin src={capsuleLandingTokenCapsuleCoin} />
        <TokenEther src={capsuleLandingTokenEther} />
        <TokenBitcoin src={capsuleLandingTokenBitcoin} />
        <TokenTether src={capsuleLandingTokenTether} />
        <TokenChainlink src={capsuleLandingTokenChainlink} />
      </MainContainer>
      <Shadow src={capsuleLandingShadow} />
    </StyledFloatingCapsule>
  );
};

export default FloatingCapsule;
