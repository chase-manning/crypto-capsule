import React from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "../styles/Button";
import { createCapsule } from "../services/contracthelper";

const StyledCreateCapsule = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ExitEvent = styled.button`
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
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.2)
  );
  border-radius: 40px;
  z-index: 1;
  backdrop-filter: blur(15px);
  box-shadow: 10px 10px 80px rgba(0, 0, 0, 0.1);
  border: solid 1px rgba(255, 255, 255, 0.7);
`;

const Header = styled.div`
  width: 100%;
  color: var(--main);
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 40px;
`;

type Props = {
  open: boolean;
  close: () => void;
};

const CreateCapsule = (props: Props) => {
  const create = async (
    beneficiary: string,
    distributionDate: Date,
    amount: string
  ) => {
    console.log("thing");
    await createCapsule(beneficiary, distributionDate, amount, [], []);
  };

  if (!props.open) return null;
  // 18.677;

  return (
    <StyledCreateCapsule>
      <ExitEvent onClick={() => props.close()} />
      <Container>
        <Header>Create Capsule</Header>
        <TextInput label="ETH" />
        <Button
          onClick={() => {
            create(
              "0x07d48BDBA7975f0DAF73BD5b85A2E3Ff87ffb24e",
              new Date(),
              "0.01"
            );
          }}
        >
          Create
        </Button>
      </Container>
    </StyledCreateCapsule>
  );
};

export default CreateCapsule;
