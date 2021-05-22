import React from "react";
import styled from "styled-components";
import dots from "../assets/dots.png";

const StyledSlider = styled.div`
  position: relative;
  width: 100%;
  padding: 10rem;
  height: 60rem;
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

const Slider = (): JSX.Element => {
  return (
    <StyledSlider>
      <Dots />
      <Gradient />
      meow
    </StyledSlider>
  );
};

export default Slider;
