import React from "react";
import styled from "styled-components";
import Input from "../styles/Input";
import Label from "../styles/Label";
import Tooltip from "./Tooltip";

const StyledTextInput = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;

const LabelContainter = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
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
      <LabelContainter>
        <Label>{props.label}</Label>
        {props.tooltip && <Tooltip content={props.tooltip} />}
      </LabelContainter>
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
