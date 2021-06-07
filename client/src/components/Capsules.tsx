import React from "react";
import styled from "styled-components";
import CapsuleType from "../types/CapsuleType";
import Capsule from "./Capsule";

const Container = styled.div`
  display: grid;
  width: 80vw;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3rem;
  justify-items: center;
`;

type Props = {
  capsules: CapsuleType[];
};

const Capsules = (props: Props): JSX.Element => {
  return (
    <Container>
      {props.capsules
        .sort(
          (a: CapsuleType, b: CapsuleType) =>
            a.distributionDate.getTime() - b.distributionDate.getTime()
        )
        .sort(
          (a: CapsuleType, b: CapsuleType) =>
            (a.empty ? 1 : 0) - (b.empty ? 1 : 0)
        )
        .map((capsule: CapsuleType) => (
          <Capsule capsule={capsule} />
        ))}
    </Container>
  );
};

export default Capsules;
