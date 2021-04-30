import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getSentCapsules } from "../services/contracthelper";
import CapsuleType from "../types/CapsuleType";
import Capsules from "./Capsules";
import Footer from "./Footer";
import Header from "./Header";

const StyledSentPage = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SentPage = (): JSX.Element => {
  const [capsules, setCapsules] = useState<CapsuleType[]>([]);

  const updateCapsules = async () => {
    const _capsules = await getSentCapsules();
    setCapsules(_capsules);
  };

  useEffect(() => {
    updateCapsules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledSentPage>
      <Header />
      <Capsules capsules={capsules} />
      <Footer />
    </StyledSentPage>
  );
};

export default SentPage;
