import React from "react";
import styled from "styled-components";
import Note from "./Note";
import noise from "../assets/noise.png";

const StyledWhyUseSlide = styled.div`
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
  background: linear-gradient(
    90deg,
    var(--bg),
    var(--sub),
    var(--bg),
    var(--bg)
  );
  opacity: 0.5;
`;

const Noise = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${noise});
  background-size: 5px 5px;
  opacity: 1;
`;

const WhyUseSlide = (): JSX.Element => {
  return (
    <StyledWhyUseSlide>
      <Noise />
      <Gradient />
      <Note
        header="Why Use Crypto Capsule?"
        body="Crypto Capsule is super versitile! Click through to see some example use cases <3"
      />
    </StyledWhyUseSlide>
  );
};

export default WhyUseSlide;
