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
  background: ${(props: Props) =>
    props.pressed ? "var(--main)" : "var(--bg)"};
  transform: translate(-6px, -2px) rotate(45deg);
`;

const TopRight = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 9px;
  height: 10px;
  background: ${(props: Props) =>
    props.pressed ? "var(--main)" : "var(--bg)"};
  border-top: solid 2px var(--main);
  /* transform: translate(-2px, -4px) rotate(45deg) scaleX(1); */
  transform: ${(props: Props) =>
    props.flatten
      ? "translate(-3.5px, -5.5px) rotate(45deg) scaleX(0.6)"
      : "translate(-2px, -4px) rotate(45deg) scaleX(1)"};
  transition: transform 0.3s;
`;

const BottomLeft = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 8px;
  height: 10px;
  background: ${(props: Props) =>
    props.pressed ? "var(--main)" : "var(--bg)"};
  border-top: solid 2px var(--main);
  transform: translate(-3px, -2px) rotate(-135deg);
  transform: ${(props: Props) =>
    props.flatten
      ? "translate(-4.5px, -3.5px) rotate(-135deg) scaleX(0.6)"
      : "translate(-3px, -2px) rotate(-135deg) scaleX(1)"};
  transition: transform 0.3s;
`;

const BackSection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: solid 2px var(--main);
  background: ${(props: Props) =>
    props.pressed ? "var(--main)" : "var(--bg)"};
  transform: ${(props: Props) =>
    props.small ? "translate(-4px, -4px)" : "translate(-6px, -6px)"};
`;

const MainSection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(props: Props) =>
    props.pressed ? "var(--main)" : "var(--bg)"};
  border: solid 2px var(--main);
  transform: ${(props: Props) =>
    props.flatten
      ? props.small
        ? "translate(-2px, -3px)"
        : "translate(-3px, -3px)"
      : "translate(0,0)"};
  transition: transform 0.3s;
`;

type Props = {
  small?: boolean;
  pressed?: boolean;
  flatten?: boolean;
};

const Block = (props: Props): JSX.Element => {
  return (
    <StyledBlock>
      <BackSection small={props.small} pressed={props.pressed} />
      <TopLeft small={props.small} pressed={props.pressed} />
      <TopRight
        small={props.small}
        pressed={props.pressed}
        flatten={props.flatten}
      />
      <BottomLeft
        small={props.small}
        pressed={props.pressed}
        flatten={props.flatten}
      />
      <MainSection
        small={props.small}
        pressed={props.pressed}
        flatten={props.flatten}
      />
    </StyledBlock>
  );
};

export default Block;
