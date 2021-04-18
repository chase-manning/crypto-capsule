import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getReceivedCapsules } from "../services/contracthelper";
import CapsuleType from "../types/CapsuleType";
import Capsules from "./Capsules";
import Footer from "./Footer";
import Header from "./Header";

const StyledReceivedPage = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReceivedPage = () => {
  const [capsules, setCapsules] = useState<CapsuleType[]>([]);

  const updateCapsules = async () => {
    const _capsules = await getReceivedCapsules();
    setCapsules(_capsules);
  };

  useEffect(() => {
    updateCapsules();
  }, []);

  return (
    <StyledReceivedPage>
      <Header />
      <Capsules capsules={capsules} />
      <Footer />
    </StyledReceivedPage>
  );
};

export default ReceivedPage;
