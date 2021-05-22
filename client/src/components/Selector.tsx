import React from "react";
import styled from "styled-components";
import Button from "./Button";
import Label from "./Label";

const StyledSelector = styled.div`
  display: flex;
  flex-direction: column;
`;

const OptionsContainer = styled.div`
  display: flex;
`;

type Props = {
  options: string[];
  activeOption: string;
  label: string;
  tooltip?: string;
  setOption: (option: string) => void;
};

const Selector = (props: Props): JSX.Element => {
  return (
    <StyledSelector>
      <Label text={props.label} tooltip={props.tooltip} />
      <OptionsContainer>
        {props.options.map((option: string, index: number) => (
          <Button
            small
            key={option}
            primary={option === props.activeOption}
            text={option}
            click={() => props.setOption(option)}
          />
        ))}
      </OptionsContainer>
    </StyledSelector>
  );
};

export default Selector;
