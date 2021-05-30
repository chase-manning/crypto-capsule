import React from "react";
import styled from "styled-components";
import Note from "./Note";

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
  background: linear-gradient(145deg, var(--primary), var(--bg));
  opacity: 0.4;
`;

const Dots = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: 7px 7px;
  opacity: 0.9;
`;

const WhyUseSlide = (): JSX.Element => {
  return (
    <StyledWhyUseSlide>
      <Gradient />
      <Note
        header="Why Use Crypto Capsule?"
        body="Crypto Capsule is super versitile! Click through to see some example use cases <3"
      />
    </StyledWhyUseSlide>
  );
};

export default WhyUseSlide;
