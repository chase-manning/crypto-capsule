import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AboutPage from "./AboutPage";
import CreatePage from "./CreatePage";
import ReceivedPage from "./ReceivedPage";
import SentPage from "./SentPage";
import Web3 from "web3";
import getWeb3 from "../services/web3Service";
import CapsuleFactory from "../contracts/CapsuleFactory.json";
import { useDispatch } from "react-redux";
import { setAccounts } from "../state/web3Slice";
import { Contract } from "web3-eth-contract";

const App = () => {
  const dispatch = useDispatch();
  const [web3, setWeb3] = useState<Web3 | undefined>();
  const [capsuleFactory, setCapsuleFactory] = useState<Contract | undefined>();

  const initWeb3 = async () => {
    try {
      const _web3 = await getWeb3();
      const _accounts = await _web3.eth.getAccounts();
      const networkId = await _web3.eth.net.getId();
      const deployedNetwork = (CapsuleFactory as any).networks[networkId];
      const _instance = new _web3.eth.Contract(
        (CapsuleFactory as any).abi,
        deployedNetwork && deployedNetwork.address
      );

      setWeb3(_web3);
      setCapsuleFactory(_instance);
      dispatch(setAccounts(_accounts));
    } catch (error) {
      alert("Error Loading Web3");
      console.error(error);
    }
  };

  useEffect(() => {
    initWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/sent">
          <SentPage />
        </Route>
        <Route path="/received">
          <ReceivedPage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/">
          <CreatePage web3={web3} capsuleFactory={capsuleFactory} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
