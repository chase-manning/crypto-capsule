import React from "react";
import styled from "styled-components";
import { createCapsule } from "../services/contracthelper";
import Button from "../styles/Button";
import Title from "../styles/Title";
import Footer from "./Footer";
import Header from "./Header";
import TextInput from "./TextInput";

const StyledCreatePage = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
`;

const CreatePage = () => {
  const create = async (
    beneficiary: string,
    distributionDate: Date,
    amount: string
  ) => {
    await createCapsule(beneficiary, distributionDate, amount, [], []);
  };

  return (
    <StyledCreatePage>
      <Header />
      <Content>
        <Title>Create Capsule</Title>
        <TextInput label="ETH" />
        <Button
          onClick={() => {
            create(
              "0x07d48BDBA7975f0DAF73BD5b85A2E3Ff87ffb24e",
              new Date("2021/06/12"),
              "0.01"
            );
          }}
        >
          Create
        </Button>
      </Content>
      <Footer />
    </StyledCreatePage>
  );
};

export default CreatePage;
