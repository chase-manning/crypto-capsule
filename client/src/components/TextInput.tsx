import React from "react";
import styled from "styled-components";
import Input from "../styles/Input";
import Label from "../styles/Label";
import Tooltip from "./Tooltip";

const StyledTextInput = styled.div`
  display: flex;
  flex-direction: column;
`;

const LabelContainter = styled.div`
  display: flex;
`;

type Props = {
  label: string;
  placeholder?: string;
  maxWidth?: string;
  tooltip?: string;
};

const TextInput = (props: Props) => {
  return (
    <StyledTextInput>
      <LabelContainter>
        <Label>{props.label}</Label>
        {props.tooltip && <Tooltip content={props.tooltip}></Tooltip>}
      </LabelContainter>
      <Input placeholder={props.placeholder} maxWidth={props.maxWidth} />
    </StyledTextInput>
  );
};

export default TextInput;
