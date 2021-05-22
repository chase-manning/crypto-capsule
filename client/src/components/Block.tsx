import React from "react";
import styled from "styled-components";

const StyledBlock = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const BackSection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bg);
  border: solid 2px var(--main);
  transform: translate(-6px, -6px);
`;

const MainSection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bg);
  border: solid 2px var(--main);
`;

const Block = () => {
  return (
    <StyledBlock>
      <BackSection />
      <MainSection />
    </StyledBlock>
  );
};

export default Block;
