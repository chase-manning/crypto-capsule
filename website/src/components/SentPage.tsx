import React from "react";
import styled from "styled-components";
import Capsule, { CapsuleType } from "./Capsule";
import Header from "./Header";

const capsules: CapsuleType[] = [
  {
    open: new Date(2021, 10, 3),
    address: "0x74459C865EA4457FE204232a63444C90a644D9BC",
    eth: 0.1241422,
    dollars: 679,
    opened: false,
  },
  {
    open: new Date(2020, 10, 3),
    address: "0x8f488cfef2B401E18F5653DD23E34e8fDE16E8E4",
    eth: 13.1924914,
    dollars: 12345,
    opened: true,
  },
  {
    open: new Date(2034, 10, 3),
    address: "0xF57B30519b3c9fE1EaeDFEC35137beFC34652667",
    eth: 0.00121,
    dollars: 29,
    opened: false,
  },
  {
    open: new Date(2014, 10, 3),
    address: "0x2b6f79d4d6F218FF4D034C3acb65Af23815d38fd",
    eth: 123.1921913,
    dollars: 76458,
    opened: true,
  },
  {
    open: new Date(2021, 1, 7),
    address: "0xF3f7f6466a6B2DfB43e2b3a17ecD9ae35D769840",
    eth: 2.2414141,
    dollars: 12040,
    opened: false,
  },
];

const StyledSentPage = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  color: var(--main);
  font-size: 35px;
  font-weight: 700;
  margin-top: 70px;
  margin-bottom: 20px;
`;

const Container = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
`;

const GetCapsules = (capsuleList: CapsuleType[]) =>
  capsuleList
    .sort(
      (a: CapsuleType, b: CapsuleType) => a.open.getTime() - b.open.getTime()
    )
    .map((capsule: CapsuleType, index: number) => (
      <Capsule key={index} capsule={capsule} />
    ));

const SentPage = () => {
  const now = new Date();
  const upcoming = capsules.filter((cap: CapsuleType) => cap.open >= now);
  const opened = capsules.filter(
    (cap: CapsuleType) => cap.open < now && cap.opened
  );
  const ready = capsules.filter(
    (cap: CapsuleType) => cap.open < now && !cap.opened
  );

  return (
    <StyledSentPage>
      <Header />
      <Container>
        <Title>Ready</Title>
        {GetCapsules(ready)}
        <Title>Upcoming</Title>
        {GetCapsules(upcoming)}
        <Title>Opened</Title>
        {GetCapsules(opened)}
      </Container>
    </StyledSentPage>
  );
};

export default SentPage;
