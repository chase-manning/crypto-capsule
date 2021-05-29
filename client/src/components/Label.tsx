import React from "react";
import styled from "styled-components";
import Tooltip from "./Tooltip";

const LabelContainter = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
`;

const StyledLabel = styled.label`
  color: var(--main);
  font-size: 2.1rem;
  text-transform: capitalize;
`;

type Props = {
  text: string;
  tooltip?: string;
};

const Label = (props: Props): JSX.Element => {
  return (
    <LabelContainter>
      <StyledLabel>{props.text}</StyledLabel>
      {props.tooltip && <Tooltip content={props.tooltip} />}
    </LabelContainter>
  );
};

export default Label;
