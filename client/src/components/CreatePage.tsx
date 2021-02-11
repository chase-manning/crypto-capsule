import React, { useEffect, useState } from "react";
import styled from "styled-components";
import getWeb3 from "../services/web3Service";
import Footer from "./Footer";
import Header from "./Header";
import Landing from "./Landing";
import CapsuleFactory from "../contracts/CapsuleFactory.json";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";

const StyledCreatePage = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const CreatePage = () => {
  const [value, setValue] = useState(0);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [capsuleFactory, setCapsuleFactory] = useState<Contract | null>(null);

  const meow = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = (CapsuleFactory as any).networks[networkId];
      const instance = new web3.eth.Contract(
        (CapsuleFactory as any).abi,
        deployedNetwork && deployedNetwork.address
      );

      setWeb3(web3);
      setAccounts(accounts);
      setCapsuleFactory(instance);
    } catch (error) {
      alert("Error Loading Web3");
      console.error(error);
    }
  };

  const createCapsule = async (
    beneficiary: string,
    distributionDate: Date,
    amount: string
  ) => {
    if (!capsuleFactory) {
      console.log("Contract doesn't exits");
      return;
    }

    if (!web3) {
      console.log("Web 3 doesn't exits");
      return;
    }

    var tx = {
      from: accounts[0],
      value: web3.utils.toWei(amount),
    };
    // const meow = await capsuleFactory.methods
    //   .newCapsule(beneficiary, distributionDate.getTime())
    //   .send(tx);

    const sent = await capsuleFactory.methods
      .getSentCapsules(accounts[0])
      .call();
    console.log(sent);
    console.log(sent.length);
  };

  useEffect(() => {
    meow();
  }, []);

  return (
    <StyledCreatePage>
      <Header />
      <div
        onClick={() =>
          createCapsule(
            "0x11ADbDe42070E6c6D7968c849B226956e3761f8E",
            new Date(),
            "10"
          )
        }
      >
        meow
      </div>
      <Landing />
      <Footer />
      {accounts.length > 0 && accounts[0]}
    </StyledCreatePage>
  );
};

export default CreatePage;
