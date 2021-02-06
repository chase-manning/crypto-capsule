import React from "react";
import styled from "styled-components";

export type CapsuleType = {
  open: Date;
  address: string;
  eth: number;
  dollars: number;
};

const StyledCapsule = styled.div`
  width: 100%;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px var(--sub);
`;

const OpenImage = styled.div`
  height: 80px;
  width: 120px;
  background-color: pink;
`;

const ClosedImage = styled.div`
  height: 80px;
  width: 120px;
  background-color: yellow;
`;

type Props = {
  capsule: CapsuleType;
};

const Capsule = (props: Props) => {
  const now = new Date();
  const open = props.capsule.open >= now;

  return (
    <StyledCapsule>
      {open && <OpenImage />}
      {!open && <ClosedImage />}
    </StyledCapsule>
  );
};

export default Capsule;
