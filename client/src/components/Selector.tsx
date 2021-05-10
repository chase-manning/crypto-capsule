import React from "react";
import styled from "styled-components";
import Label from "./Label";

const StyledSelector = styled.div`
  display: flex;
  flex-direction: column;
`;

const OptionsContainer = styled.div`
  display: flex;
`;

type OptionProps = {
  active: boolean;
  left?: boolean;
  right?: boolean;
};

const Option = styled.button`
  height: 3.5rem;
  width: 12rem;
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 1rem;
  cursor: pointer;
  text-transform: capitalize;
  background-color: ${(props: OptionProps) =>
    props.active ? "var(--main)" : "var(--white)"};
  color: ${(props: OptionProps) =>
    props.active ? "var(--white)" : "var(--main)"};
  border: solid 1px var(--main);
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: ${(props: OptionProps) =>
    props.left ? "1.7rem" : "0"};
  border-top-left-radius: ${(props: OptionProps) =>
    props.left ? "1.7rem" : "0"};
  border-bottom-right-radius: ${(props: OptionProps) =>
    props.right ? "1.7rem" : "0"};
  border-top-right-radius: ${(props: OptionProps) =>
    props.right ? "1.7rem" : "0"};
`;

type Props = {
  options: string[];
  activeOption: string;
  label: string;
  tooltip?: string;
  setOption: (option: string) => void;
};

const Selector = (props: Props) => {
  return (
    <StyledSelector>
      <Label text={props.label} tooltip={props.tooltip} />
      <OptionsContainer>
        {props.options.map((option: string, index: number) => (
          <Option
            key={option}
            active={option === props.activeOption}
            left={index === 0}
            right={index === props.options.length - 1}
            onClick={() => props.setOption(option)}
          >
            {option}
          </Option>
        ))}
      </OptionsContainer>
    </StyledSelector>
  );
};

export default Selector;
