import React from "react";
import styled from "styled-components";
import Input from "../styles/Input";
import Label from "../styles/Label";

const StyledTextInput = styled.div`
  width: 100%;
`;

type Props = {
  label: string;
  placeholder?: string;
  maxWidth?: string;
};

const TextInput = (props: Props) => {
  return (
    <StyledTextInput>
      <Label>{props.label}</Label>
      <Input placeholder={props.placeholder} maxWidth={props.maxWidth} />
    </StyledTextInput>
  );
};

export default TextInput;
