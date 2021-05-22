import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAddress, setAddress } from "../state/userSlice";
import Button from "./Button";
import { getAddress } from "../services/contracthelper";

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
    <Button
      text={address ? formattedAddress() : "Connect"}
      click={() => connect()}
    />
  );
};

export default Connector;
