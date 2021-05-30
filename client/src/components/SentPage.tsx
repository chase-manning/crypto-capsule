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
  justify-content: center;
  align-items: center;
  height: 77vh;
`;

const Loading = styled.div`
  color: var(--main);
  font-size: 2rem;
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
      {loading && <Loading>Loading...</Loading>}
      {!loading && capsules.length === 0 && <NoCapsules />}
      <Capsules
        capsules={capsules}
        isReceived={false}
        updateCapsules={() => updateCapsules()}
      />
    </StyledSentPage>
  );
};

export default SentPage;
