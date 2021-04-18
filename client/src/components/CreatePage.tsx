import React, { useState } from "react";
import styled from "styled-components";
import { createCapsule } from "../services/contracthelper";
import { inputToDate } from "../services/dateHelper";
import Button from "../styles/Button";
import Title from "../styles/Title";
import { Asset } from "../types/CapsuleType";
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

const ButtonContainer = styled.div`
  margin: auto;
  margin-top: 3rem;
`;

const CreatePage = () => {
  const [beneficiary, setBeneficiary] = useState("");
  const [distributionDate, setDistributionDate] = useState("");

  const clearInputs = () => {
    setBeneficiary("");
    setDistributionDate("");
  };

  const create = async (assets: Asset[]) => {
    const date = inputToDate(distributionDate);
    await createCapsule(beneficiary, date, assets);
    clearInputs();
  };

  return (
    <StyledCreatePage>
      <Header />
      <Content>
        <Title>Create Capsule</Title>
        <TextInput
          label="Distribution Date"
          placeholder="mm/dd/yyyy"
          maxWidth="12rem"
          tooltip="This is the date when the capsule will be able to be opened"
          value={distributionDate}
          setValue={(value: string) => setDistributionDate(value)}
        />
        <TextInput
          label="Beneficiary"
          placeholder="e.g. 0x07d48BDBA7975f0DAF73BD5b85A2E3Ff87ffb24e"
          maxWidth="43rem"
          tooltip="This is the wallet address that your crypto will be sent to on the distribution date."
          value={beneficiary}
          setValue={(value: string) => setBeneficiary(value)}
        />
        <ButtonContainer>
          <Button
            primary
            onClick={() => {
              create([{ token: "ETH", value: 0.001 }]);
            }}
          >
            Create
          </Button>
        </ButtonContainer>
      </Content>
      <Footer />
    </StyledCreatePage>
  );
};

export default CreatePage;
