import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import getWeb3 from "../services/web3Service";
import Footer from "./Footer";
import Header from "./Header";
import Landing from "./Landing";
import SimpleStorageContract from "../contracts/SimpleStorage.json";

const StyledCreatePage = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const CreatePage = () => {
  const [value, setValue] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const meow = async () => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = SimpleStorageContract.networks[networkId];
        const instance = new web3.eth.Contract(
          SimpleStorageContract.abi,
          deployedNetwork && deployedNetwork.address
        );

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        this.setState({ web3, accounts, contract: instance }, this.runExample);
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
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
    </StyledCreatePage>
  );
};

export default CreatePage;
