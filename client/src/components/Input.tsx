import React from "react";
import styled from "styled-components";

type StyledInputProps = {
  maxWidth?: string;
};

const StyledInput = styled.input`
  width: 100%;
  border: solid 2px var(--main);
  padding: 10px;
  color: var(--main);
  font-size: 16px;
  background-color: var(--bg);
  max-width: ${(props: StyledInputProps) => props.maxWidth};

  :active {
    border: solid 2px var(--primary);
  }

  ::placeholder {
    color: var(--sub);
  }
`;

type Props = {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  maxWidth?: string;
};

const Input = (props: Props) => {
  return (
    <StyledInput
      value={props.value}
      onChange={(e: any) => props.setValue(e.target.value)}
      placeholder={props.placeholder}
      maxWidth={props.maxWidth}
    />
  );
};

export default Input;
