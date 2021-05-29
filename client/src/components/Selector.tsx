import React from "react";
import styled from "styled-components";
import Button from "./Button";
import Label from "./Label";

const StyledSelector = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const Container = styled.div`
  display: flex;
  margin: 1rem 0;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

type Props = {
  options: string[];
  activeOption: string;
  label: string;
  tooltip?: string;
  setOption: (option: string) => void;
};

const Selector = (props: Props): JSX.Element => {
  const options = [...props.options];
  options.reverse();

  return (
    <StyledSelector>
      <Label text={props.label} tooltip={props.tooltip} />
      <Container>
        <OptionsContainer>
          {options.map((option: string, index: number) => (
            <Button
              small
              key={option}
              selected={option === props.activeOption}
              text={option}
              click={() => props.setOption(option)}
            />
          ))}
        </OptionsContainer>
      </Container>
    </StyledSelector>
  );
};

export default Selector;
