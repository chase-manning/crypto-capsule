import React from "react";
import styled from "styled-components";

import ethImage from "../assets/capsule-landing-token-ether.png";
import bnbImage from "../assets/capsule-landing-token-bnb.png";
import maticImage from "../assets/capsule-landing-token-matic.png";
import arbitrumImage from "../assets/capsule-landing-token-arbitrum.png";

type NetworkType = {
  image: string;
  name: string;
  live: boolean;
};

const networks: NetworkType[] = [
  {
    image: ethImage,
    name: "Ethereum Mainet",
    live: true,
  },
  {
    image: arbitrumImage,
    name: "Arbitrum",
    live: true,
  },
  {
    image: maticImage,
    name: "MATIC",
    live: false,
  },
  {
    image: bnbImage,
    name: "Binance Smart Chain",
    live: false,
  },
  {
    image: ethImage,
    name: "Rinkeby",
    live: true,
  },
];

const StyledSupportedNetworks = styled.div`
  position: relative;
  width: 100%;
  padding: 6rem;

  @media (max-width: 600px) {
    padding: 4rem 2rem;
  }
`;

const Header = styled.h2`
  color: var(--main);
  font-size: 8rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 6rem;
  transform: rotate(-3deg);

  @media (max-width: 600px) {
    font-size: 4rem;
  }
`;

const Networks = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const NetworkContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    margin-bottom: 6rem;
  }
`;

const NetworkImage = styled.img`
  height: 10vw;
  user-drag: none;
  user-select: none;

  @media (max-width: 600px) {
    height: 50vw;
  }
`;

const NetworkName = styled.p`
  color: var(--sub);
  font-size: 3rem;
  font-weight: 500;
  width: 100%;
  text-align: center;
  margin-top: 3rem;

  @media (max-width: 600px) {
    margin-top: 2rem;
  }
`;

const ComingSoonContainer = styled.div`
  width: 100%;
  height: 80%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ComingSoonOverlay = styled.div`
  width: 120%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--bg);
  opacity: 0.7;
`;

const ComingSoonText = styled.div`
  position: relative;
  color: var(--main);
  font-size: 4rem;
  font-weight: 500;
  width: 100%;
  text-align: center;
  transform: rotate(-30deg);
`;

const SupportedNetworks = (): JSX.Element => {
  return (
    <StyledSupportedNetworks>
      <Header>Supported Networks</Header>
      <Networks>
        {networks.map((n: NetworkType) => (
          <NetworkContainer>
            <NetworkImage src={n.image} alt={`${n.name} Network Image`} />
            <NetworkName>{n.name}</NetworkName>
            {!n.live && (
              <ComingSoonContainer>
                <ComingSoonOverlay />
                <ComingSoonText>Coming Soon</ComingSoonText>
              </ComingSoonContainer>
            )}
          </NetworkContainer>
        ))}
      </Networks>
    </StyledSupportedNetworks>
  );
};

export default SupportedNetworks;
