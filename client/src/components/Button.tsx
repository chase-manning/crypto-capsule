import React, { useState } from "react";
import styled from "styled-components";
import Block from "./Block";

type StyledProps = {
  primary?: boolean;
  selected?: boolean;
  small?: boolean;
  flatten?: boolean;
  disabled?: boolean;
};

const StyledButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props: StyledProps) =>
    props.disabled ? "not-allowed" : "pointer"};
  margin-right: -2px;
  transform: translateX(8px);
  opacity: ${(props: StyledProps) => (props.disabled ? "0.5" : "1")};
`;

const Content = styled.div`
  color: ${(props: StyledProps) =>
    props.selected ? "var(--bg)" : "var(--main)"};
  padding: ${(props: StyledProps) =>
    props.small
      ? "0.7rem 1.8rem"
      : props.primary
      ? "1.5rem 3rem"
      : "1.1rem 2.1rem"};
  font-size: ${(props: StyledProps) =>
    props.small ? "1.9rem" : props.primary ? "2.6rem" : "2rem"};
  position: relative;
  transform: ${(props: StyledProps) =>
    props.flatten
      ? props.small
        ? "translate(-2px, -3px)"
        : "translate(-3px, -3px)"
      : "translate(0,0)"};
  transition: transform 0.3s;
  text-transform: capitalize;
`;

type Props = {
  primary?: boolean;
  selected?: boolean;
  small?: boolean;
  disabled?: boolean;
  text: string;
  click: () => void;
};

const Button = (props: Props): JSX.Element => {
  const [down, setDown] = useState(false);

  return (
    <StyledButton
      disabled={props.disabled}
      onClick={() => props.click()}
      onMouseDown={() => setDown(true)}
      onMouseUp={() => setDown(false)}
      onMouseLeave={() => setDown(false)}
    >
      <Block pressed={props.selected} flatten={down} />
      <Content
        primary={props.primary}
        small={props.small}
        selected={props.selected}
        flatten={down}
      >
        {props.text}
      </Content>
    </StyledButton>
  );
};

export default Button;
