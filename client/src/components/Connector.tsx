import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectAddress, setAddress } from "../state/userSlice";
import Button from "./Button";
import { getAddress } from "../services/contracthelper";

const StyledConnector = styled.div`
  z-index: 1;
`;

const Connector = (): JSX.Element => {
  const dispatch = useDispatch();
  const address = useSelector(selectAddress);

  const connect = async () => {
    const _address = await getAddress();
    dispatch(setAddress(_address));
  };

  const formattedAddress = () => {
    if (address.length < 8) return "";
    return `${address.substr(0, 4)}...${address.substr(address.length - 4, 4)}`;
  };

  return (
    <StyledConnector>
      <Button
        text={address ? formattedAddress() : "Connect"}
        click={() => connect()}
      />
    </StyledConnector>
  );
};

export default Connector;
