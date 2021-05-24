import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getSentCapsules } from "../services/contracthelper";
import CapsuleType from "../types/CapsuleType";
import Capsules from "./Capsules";
import NoCapsules from "./NoCapsules";

const StyledSentPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 77vh;
`;

const SentPage = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [capsules, setCapsules] = useState<CapsuleType[]>([]);

  const updateCapsules = async () => {
    const _capsules = await getSentCapsules();
    setCapsules(_capsules);
    setLoading(false);
  };

  useEffect(() => {
    updateCapsules();
  }, []);

  return (
    <StyledSentPage>
      {loading && <div>Loading</div>}
      {!loading && capsules.length === 0 && <NoCapsules isReceived />}
      <Capsules capsules={capsules} />
    </StyledSentPage>
  );
};

export default SentPage;
