import React from "react";
import styled from "styled-components";
import dots from "../assets/dots.png";
import Block from "./Block";

const StyledSlider = styled.div`
  position: relative;
  width: 100%;
  padding: 12rem;
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
  padding-top: 3.3rem;
  transform: rotate(-3deg);
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
  font-size: 8rem;
  font-weight: 600;
  width: 100%;
  text-align: center;
  margin-bottom: 3rem;
`;

const Body = styled.p`
  color: var(--sub);
  font-size: 3rem;
  font-weight: 500;
  width: 100%;
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
          </Body>
        </Content>
      </Container>
    </StyledSlider>
  );
};

export default Slider;
