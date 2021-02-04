import React from "react";
import styled from "styled-components";
import { BooleanLiteral } from "typescript";

const StyledCreateCapsule = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ExitEvent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const Container = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  background-color: white;
  border-radius: 40px;
`;

type Props = {
  open: boolean;
  close: () => void;
};

const CreateCapsule = (props: Props) => {
  if (!props.open) return null;

  return (
    <StyledCreateCapsule>
      <ExitEvent onClick={() => props.close()} />
      <Container>meow</Container>
    </StyledCreateCapsule>
  );
};

export default CreateCapsule;
