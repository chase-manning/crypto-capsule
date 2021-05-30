import React from "react";
import styled, { keyframes } from "styled-components";

import capsuleLandingTokenCapsuleCoin from "../assets/capsule-landing-token-capsule-coin.png";
import capsuleLandingTokenEther from "../assets/capsule-landing-token-ether.png";
import capsuleLandingTokenBitcoin from "../assets/capsule-landing-token-bitcoin.png";
import capsuleLandingTokenTether from "../assets/capsule-landing-token-tether.png";
import capsuleLandingTokenChainlink from "../assets/capsule-landing-token-chainlink.png";

const tokens = [
  capsuleLandingTokenCapsuleCoin,
  capsuleLandingTokenEther,
  capsuleLandingTokenBitcoin,
  capsuleLandingTokenTether,
  capsuleLandingTokenChainlink,
];

const StyledTokenSlide = styled.div`
  position: relative;
  width: 100%;
  height: 40rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const leftToRightAnimation = keyframes`
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(100vw);
    }
`;

const TokenSets = styled.div`
  display: flex;
  align-items: center;
  animation: ${leftToRightAnimation} 10s linear 0s infinite;
`;

const TokenGroup = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-around;
`;

const Token = styled.img`
  height: 10vw;
`;

const TokenSlide = (): JSX.Element => {
  return (
    <StyledTokenSlide>
      <TokenSets>
        <TokenGroup>
          {tokens.map((token: any) => (
            <Token src={token} />
          ))}
        </TokenGroup>
        <TokenGroup>
          {tokens.map((token: any) => (
            <Token src={token} />
          ))}
        </TokenGroup>
        <TokenGroup>
          {tokens.map((token: any) => (
            <Token src={token} />
          ))}
        </TokenGroup>
      </TokenSets>
    </StyledTokenSlide>
  );
};

export default TokenSlide;
