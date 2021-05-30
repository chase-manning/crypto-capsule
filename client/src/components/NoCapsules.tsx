import React, { useState } from "react";
import styled from "styled-components";
import noCapsulesImage from "../assets/capsule-open-large.png";
import Button from "./Button";
import CreateCapsule from "./CreateCapsule";

const StyledNoCapsules = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.h4`
  color: var(--main);
  font-size: 4.3rem;
  font-weight: 500;
  margin-top: 1rem;
  margin-bottom: 5rem;
  transform: rotate(-6deg);
`;

const Image = styled.img`
  width: 20rem;
  margin-bottom: 3.5rem;
`;

const ButtonContainter = styled.div`
  transform: rotate(-2deg);
`;

type Props = {
  isReceived?: boolean;
};

const NoCapsules = (props: Props): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <StyledNoCapsules>
      <Text>{`No ${props.isReceived ? "Received" : "Sent"} Capsules`}</Text>
      <Image src={noCapsulesImage} />
      <ButtonContainter>
        <Button text="Create Capsule" click={() => setOpen(true)} />
      </ButtonContainter>
      <CreateCapsule show={open} close={() => setOpen(false)} />
    </StyledNoCapsules>
  );
};

export default NoCapsules;
