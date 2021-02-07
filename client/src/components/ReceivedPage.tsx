import React from "react";
import styled from "styled-components";
import { CapsuleType } from "./Capsule";
import Capsules from "./Capsules";
import Footer from "./Footer";
import Header from "./Header";

const capsules: CapsuleType[] = [
  {
    open: new Date(2021, 10, 3),
    address: "0x74459C865EA4457FE204232a63444C90a644D9BC",
    eth: 0.1241422,
    dollars: 679,
    opened: false,
  },
  {
    open: new Date(2002, 10, 3),
    address: "0xF57B30519b3c9fE1EaeDFEC35137beFC34652667",
    eth: 0.00121,
    dollars: 29,
    opened: false,
  },
  {
    open: new Date(2021, 1, 7),
    address: "0xF3f7f6466a6B2DfB43e2b3a17ecD9ae35D769840",
    eth: 2.2414141,
    dollars: 12040,
    opened: false,
  },
];

const StyledReceivedPage = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReceivedPage = () => {
  return (
    <StyledReceivedPage>
      <Header />
      <Capsules capsules={capsules} />
      <Footer />
    </StyledReceivedPage>
  );
};

export default ReceivedPage;
