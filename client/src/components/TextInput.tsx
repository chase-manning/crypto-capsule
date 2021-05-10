import React from "react";
import styled from "styled-components";
import Input from "../styles/Input";
import Label from "./Label";

const StyledTextInput = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;

type Props = {
  label: string;
  placeholder?: string;
  maxWidth?: string;
  tooltip?: string;
  value: string;
  setValue: (value: string) => void;
};

const TextInput = (props: Props): JSX.Element => {
  return (
    <StyledTextInput>
      <Label text={props.label} tooltip={props.tooltip} />
      <Input
        placeholder={props.placeholder}
        maxWidth={props.maxWidth}
        value={props.value}
        onChange={(e: any) => props.setValue(e.target.value)}
      />
    </StyledTextInput>
  );
};

export default TextInput;
