import React from "react";
import styled from "styled-components";
import Label from "./Label";

const StyledDropdown = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;

const Select = styled.select`
  text-transform: capitalize;
  width: 100%;
  border: solid 1px var(--sub);
  border-radius: 5px;
  padding: 10px;
  color: var(--main);
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0);

  :active {
    border: solid 1px var(--primary);
  }
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
