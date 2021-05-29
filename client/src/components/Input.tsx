import React from "react";
import styled from "styled-components";

type StyledInputProps = {
  maxWidth?: string;
};

const StyledInput = styled.input`
  width: 100%;
  border: solid 2px var(--main);
  padding: 1rem;
  color: var(--main);
  font-size: 1.9rem;
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

const Input = (props: Props): JSX.Element => {
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
