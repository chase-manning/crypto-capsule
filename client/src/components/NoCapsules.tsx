import React, { useState } from "react";
import styled from "styled-components";
import capsule from "../assets/capsule.jpg";
import Button from "./Button";
import CreateCapsule from "./CreateCapsule";

const StyledNoCapsules = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 38rem;
`;

const Text = styled.h4`
  color: var(--main);
  font-size: 2.7rem;
  font-weight: 500;
  margin-top: 1rem;
  margin-bottom: 3rem;
`;

type Props = {
  isReceived?: boolean;
};

const NoCapsules = (props: Props): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <StyledNoCapsules>
      <Image src={capsule} />
      <Text>{`No ${props.isReceived ? "Received" : "Sent"} Capsules`}</Text>
      <Button primary text="Create Capsule" click={() => setOpen(true)} />
      <CreateCapsule show={open} close={() => setOpen(false)} />
    </StyledNoCapsules>
  );
};

export default NoCapsules;
