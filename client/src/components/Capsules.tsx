import React from "react";
import styled from "styled-components";
import { getNextOpenDate } from "../services/dateHelper";
import CapsuleType from "../types/CapsuleType";
import Capsule from "./Capsule";

const Container = styled.div`
  display: grid;
  width: 80vw;
  grid-template-columns: repeat(auto-fit, minmax(36rem, 1fr));
  grid-gap: 3rem;
  justify-items: center;
  align-items: center;
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
            getNextOpenDate(a).getTime() - getNextOpenDate(b).getTime()
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
