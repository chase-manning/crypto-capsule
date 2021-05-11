import React from "react";
import styled from "styled-components";
import Label from "./Label";

const StyledDropdown = styled.div`
  display: flex;
  flex-direction: column;
`;

const Select = styled.select`
  text-transform: capitalize;
`;

const Option = styled.option`
  text-transform: capitalize;
`;

type Props = {
  label: string;
  tooltip?: string;
  options: string[];
  activeOption: string;
  setOption: (option: string) => void;
};

const Dropdown = (props: Props) => {
  return (
    <StyledDropdown>
      <Label text={props.label} tooltip={props.tooltip} />
      <Select>
        {props.options.map((option: string) => (
          <Option
            key={option}
            value={option}
            selected={props.activeOption === option}
            onClick={() => props.setOption(option)}
          >
            {option}
          </Option>
        ))}
      </Select>
    </StyledDropdown>
  );
};

export default Dropdown;
