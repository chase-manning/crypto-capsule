import React from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import Landing from "./Landing";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveAcount, selectCapsuleFactory } from "../state/web3Slice";
import Web3 from "web3";

const StyledCreatePage = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

type Props = {
  web3?: Web3;
};

const CreatePage = (props: Props) => {
  const dispatch = useDispatch();
  const activeAccount = useSelector(selectActiveAcount);
  const capsuleFactory = useSelector(selectCapsuleFactory);

  const createCapsule = async (
    beneficiary: string,
    distributionDate: Date,
    amount: string
  ) => {
    if (!capsuleFactory) {
      console.log("Contract doesn't exits");
      return;
    }

    if (!props.web3) {
      console.log("Web 3 doesn't exits");
      return;
    }

    var tx = {
      from: activeAccount,
      value: props.web3.utils.toWei(amount),
    };
    const meow = await capsuleFactory.methods
      .newCapsule(beneficiary, distributionDate.getTime())
      .send(tx);

    const sent = await capsuleFactory.methods
      .getSentCapsules(activeAccount)
      .call();
    console.log(sent);
    console.log(sent.length);
  };

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
      {activeAccount && activeAccount}
    </StyledCreatePage>
  );
};

export default CreatePage;
