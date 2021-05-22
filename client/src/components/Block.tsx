import React from "react";
import styled from "styled-components";

const StyledBlock = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const TopLeft = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 0;
  border-top: solid 2px var(--main);
  transform: translate(-6px, -2px) rotate(45deg);
`;

const TopRight = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 9px;
  height: 10px;
  background: var(--bg);
  border-top: solid 2px var(--main);
  transform: translate(-2px, -4px) rotate(45deg);
`;

const BottomLeft = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 8px;
  height: 10px;
  background: var(--bg);
  border-top: solid 2px var(--main);
  transform: translate(-3px, -2px) rotate(-135deg);
`;

const BackSection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bg);
  border: solid 2px var(--main);
  transform: ${(props: Props) =>
    props.small ? "translate(-4px, -4px)" : "translate(-6px, -6px)"};
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

type Props = {
  small?: boolean;
  pressed?: boolean;
};

const Block = (props: Props) => {
  return (
    <StyledBlock>
      <BackSection small={props.small} pressed={props.pressed} />
      <TopLeft />
      <TopRight />
      <BottomLeft />
      <MainSection />
    </StyledBlock>
  );
};

export default Block;
