import React from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Authereum from "authereum";
import BurnerConnectProvider from "@burner-wallet/burner-connect-provider";
import { useDispatch, useSelector } from "react-redux";
import { selectAddress, setAddress } from "../state/userSlice";
import Button from "../styles/Button";
import Web3Modal from "web3modal";
import Web3 from "web3";
import { getAddress } from "../services/contracthelper";

const INFURA_ID = "d0a18891cac34a09a8d1172502353015";

const Connector = () => {
  const dispatch = useDispatch();
  const address = useSelector(selectAddress);

  const connect = async () => {
    const _address = getAddress();
    if (!_address) {
      dispatch(setAddress(_address));
      return;
    }

    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: INFURA_ID,
        },
      },
      authereum: {
        package: Authereum,
      },
      burnerconnect: {
        package: BurnerConnectProvider,
        options: {
          defaultNetwork: "100",
        },
      },
    };
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
      providerOptions,
    });
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    window.web3 = web3;
    const addressList = await (window as any).web3.eth.getAccounts();
    dispatch(setAddress(addressList[0]));
    (window as any).address = addressList[0];
  };

  const formattedAddress = () => {
    if (address.length < 8) return "";
    return `${address.substr(0, 4)}...${address.substr(address.length - 4, 4)}`;
  };

  return (
    <Button onClick={() => connect()}>
      {address ? formattedAddress() : "Connect"}
    </Button>
  );
};

export default Connector;
