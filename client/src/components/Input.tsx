import React from "react";
import styled from "styled-components";

type StyledInputProps = {
  maxWidth?: string;
};

const StyledInput = styled.input`
  width: 100%;
  border: solid 1px var(--sub);
  border-radius: 5px;
  padding: 10px;
  color: var(--main);
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0);
  max-width: ${(props: StyledInputProps) => props.maxWidth};

  :active {
    border: solid 1px var(--primary);
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
