import React from "react";
import styled from "styled-components";
import dots from "../assets/dots.png";
import Block from "./Block";
import Button from "./Button";

const StyledSlider = styled.div`
  position: relative;
  width: 100%;
  padding: 13rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Gradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(145deg, var(--primary), var(--bg));
  opacity: 0.4;
`;

const Dots = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${dots});
  background-size: 7px 7px;
  opacity: 0.9;
`;

const Container = styled.div`
  position: relative;
  width: 60vw;
  padding: 5rem;
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h2`
  color: var(--main);
  font-size: 7rem;
  font-weight: 600;
  width: 100%;
  text-align: center;
  margin-bottom: 3rem;
`;

const Body = styled.p`
  color: var(--sub);
  font-size: 2rem;
  font-weight: 500;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 5rem;

  button {
    margin: 0 2rem;
  }
`;

const Slider = (): JSX.Element => {
  return (
    <StyledSlider>
      <Dots />
      <Gradient />
      <Container>
        <Block />
        <Content>
          <Header>What is Crypto Capsule?</Header>
          <Body>
            Crypto Capsule is a free tool for sending crypto to yourself or
            someone else that can only be accessed at a specified time in the
            future. When creating a Capsule you can choose several options to
            customise when the Capsule opens and how the crypto is distributed.
            Crypto Capsule uses an Ethereum Smart Contract to store the crypto
            while it is in the Capsule and for retrieving the crypto when it is
            opened.
          </Body>
          <ButtonContainer>
            <Button
              text="View Smart Contract"
              click={() =>
                (window as any)
                  .open(
                    "https://etherscan.io/address/0x07d48bdba7975f0daf73bd5b85a2e3ff87ffb24e",
                    "_blank"
                  )
                  .focus()
              }
            />
            <Button
              text="View Source Code"
              click={() =>
                (window as any)
                  .open(
                    "https://github.com/chase-manning/crypto-capsule/blob/master/contracts/Capsule.sol",
                    "_blank"
                  )
                  .focus()
              }
            />
          </ButtonContainer>
        </Content>
      </Container>
    </StyledSlider>
  );
};

export default Slider;
