import React from "react";
import styled from "styled-components";
import dots from "../assets/dots.png";
import Note from "./Note";

const StyledWhatIsSlide = styled.div`
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

const WhatIsSlide = (): JSX.Element => {
  return (
    <StyledWhatIsSlide>
      <Dots />
      <Gradient />
      <Note
        header="What is Crypto Capsule?"
        body="Crypto Capsule is a free tool for sending crypto to yourself or
            someone else that can only be accessed at a specified time in the
            future. When creating a Capsule you can choose several options to
            customise when the Capsule opens and how the crypto is distributed."
      />
    </StyledWhatIsSlide>
  );
};

export default WhatIsSlide;
