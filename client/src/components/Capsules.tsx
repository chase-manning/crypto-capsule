import React from "react";
import styled from "styled-components";
import Title from "../styles/Title";
import CapsuleType from "../types/CapsuleType";
import Capsule from "./Capsule";

const Container = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
`;

const GetCapsules = (capsuleList: CapsuleType[]) =>
  capsuleList
    .sort(
      (a: CapsuleType, b: CapsuleType) =>
        new Date(a.distributionDate).getTime() -
        new Date(b.distributionDate).getTime()
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
    (cap: CapsuleType) => new Date(cap.distributionDate) < now && !cap.opened
  );
  const upcoming = props.capsules.filter(
    (cap: CapsuleType) => new Date(cap.distributionDate) >= now
  );
  const opened = props.capsules.filter(
    (cap: CapsuleType) => new Date(cap.distributionDate) < now && cap.opened
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
