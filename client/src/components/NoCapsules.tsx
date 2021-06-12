import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import noCapsulesImage from "../assets/capsule-open-large.png";
import { getAddress } from "../services/contracthelper";
import { selectAddress, setAddress } from "../state/userSlice";
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
  updateCapsules: () => void;
};

const NoCapsules = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const address = useSelector(selectAddress);

  const [open, setOpen] = useState(false);

  const connect = async () => {
    const _address = await getAddress();
    dispatch(setAddress(_address));
    props.updateCapsules();
  };

  return (
    <StyledNoCapsules>
      <Text>
        {address
          ? `No ${props.isReceived ? "Received" : "Sent"} Capsules`
          : "Wallet Not Connected"}
      </Text>
      <Image src={noCapsulesImage} alt="Empty Capsule Image" />
      <ButtonContainter>
        <Button
          text={address ? "Create Capsule" : "Connect"}
          click={() => {
            if (address) setOpen(true);
            else connect();
          }}
        />
      </ButtonContainter>
      <CreateCapsule show={open} close={() => setOpen(false)} />
    </StyledNoCapsules>
  );
};

export default NoCapsules;
