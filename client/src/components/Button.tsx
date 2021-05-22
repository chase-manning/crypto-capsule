import React from "react";
import styled from "styled-components";

type StyledProps = {
  primary?: boolean;
};

const StyledButton = styled.button`
  padding: ${(props: StyledProps) =>
    props.primary ? "18px 34px" : "13px 27px"};
  font-size: ${(props: StyledProps) => (props.primary ? "18px" : "15px")};
  border-radius: ${(props: StyledProps) => (props.primary ? "29px" : "22px")};
  background-color: ${(props: StyledProps) =>
    props.primary ? "var(--primary)" : "var(--dark)"};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: ${(props: StyledProps) =>
    props.primary ? "5px 5px 40px var(--primary-shadow)" : "none"};
  transition: all 0.3s;

  :hover {
    box-shadow: ${(props: StyledProps) =>
      props.primary ? "2px 2px 20px var(--primary-shadow)" : "none"};
  }
`;

type Props = {
  primary?: boolean;
  text: string;
  click: () => void;
};

const Button = (props: Props) => {
  return (
    <StyledButton primary={props.primary} onClick={() => props.click()}>
      {props.text}
    </StyledButton>
  );
};

export default Button;
