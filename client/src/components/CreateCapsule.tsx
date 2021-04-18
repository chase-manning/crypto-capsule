import React from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import { useSelector } from "react-redux";
import { selectActiveAcount } from "../state/web3Slice";
import Button from "../styles/Button";
import { getSentCapsules } from "../services/contracthelper";

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
  const activeAccount = useSelector(selectActiveAcount);

  const createCapsule = async (
    beneficiary: string,
    distributionDate: Date,
    amount: string
  ) => {
    // var tx = {
    //   from: activeAccount,
    //   value: props.web3.utils.toWei(amount),
    // };
    // await props.capsuleFactory.methods
    //   .newCapsule(beneficiary, distributionDate.getTime())
    //   .send(tx);
    // const sent = await props.capsuleFactory.methods
    //   .getSentCapsules(activeAccount)
    //   .call();
    // console.log(sent);
    // console.log(sent.length);
    const meow = await getSentCapsules();
    console.log(meow);
  };

  if (!props.open) return null;

  return (
    <StyledCreateCapsule>
      <ExitEvent onClick={() => props.close()} />
      <Container>
        <Header>Create Capsule</Header>
        <TextInput label="ETH" />
        <Button
          onClick={() => {
            createCapsule(
              "0x11ADbDe42070E6c6D7968c849B226956e3761f8E",
              new Date(),
              "10"
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
