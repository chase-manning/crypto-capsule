import React from "react";
import styled from "styled-components";
import Capsule, { CapsuleType } from "./Capsule";

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
      <Capsule
        key={index}
        capsule={capsule}
        last={index === capsuleList.length - 1}
      />
    ));

type Props = {
  capsules: CapsuleType[];
};

const Capsules = (props: Props) => {
  const now = new Date();
  const ready = props.capsules.filter(
    (cap: CapsuleType) => cap.open < now && !cap.opened
  );
  const upcoming = props.capsules.filter((cap: CapsuleType) => cap.open >= now);
  const opened = props.capsules.filter(
    (cap: CapsuleType) => cap.open < now && cap.opened
  );

  return (
    <Container>
      {ready.length > 0 && (
        <>
          <Title>Ready</Title>
          {GetCapsules(ready)}
        </>
      )}
      {upcoming.length > 0 && (
        <>
          <Title>Upcoming</Title>
          {GetCapsules(upcoming)}
        </>
      )}
      {opened.length > 0 && (
        <>
          <Title>Opened</Title>
          {GetCapsules(opened)}
        </>
      )}
    </Container>
  );
};

export default Capsules;
