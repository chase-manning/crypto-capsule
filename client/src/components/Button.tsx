import React from "react";
import styled from "styled-components";
import Block from "./Block";

type StyledProps = {
  primary?: boolean;
};

const StyledButton = styled.button`
  position: relative;
  color: var(--main);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Content = styled.div`
  padding: ${(props: StyledProps) =>
    props.primary ? "18px 34px" : "13px 27px"};
  font-size: ${(props: StyledProps) => (props.primary ? "18px" : "15px")};
  position: relative;
`;

type Props = {
  primary?: boolean;
  text: string;
  click: () => void;
};

const Button = (props: Props) => {
  return (
    <StyledButton onClick={() => props.click()}>
      <Block />
      <Content primary={props.primary}>{props.text}</Content>
    </StyledButton>
  );
};

export default Button;
