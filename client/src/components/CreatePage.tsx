import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import getWeb3 from "../services/web3Service";
import Footer from "./Footer";
import Header from "./Header";
import Landing from "./Landing";
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import Web3 from "web3";

const StyledCreatePage = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const CreatePage = () => {
  const [value, setValue] = useState(0);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [contract, setContract] = useState<any | null>(null);

  useEffect(() => {
    const meow = async () => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = (SimpleStorageContract as any).networks[
          networkId
        ];
        const instance = new web3.eth.Contract(
          (SimpleStorageContract as any).abi,
          deployedNetwork && deployedNetwork.address
        );

        setWeb3(web3);
        setAccounts(accounts);
        setContract(instance);
      } catch (error) {
        alert("Error Loading Web3");
        console.error(error);
      }
    };
    meow();
  }, []);

  return (
    <StyledCreatePage>
      <Header />
      <Landing />
      <Footer />
      {accounts.length > 0 && accounts[0]}
    </StyledCreatePage>
  );
};

export default CreatePage;
