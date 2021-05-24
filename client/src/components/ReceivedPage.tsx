import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getReceivedCapsules } from "../services/contracthelper";
import CapsuleType from "../types/CapsuleType";
import Capsules from "./Capsules";
import NoCapsules from "./NoCapsules";

const StyledReceivedPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 77vh;
`;

const ReceivedPage = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [capsules, setCapsules] = useState<CapsuleType[]>([]);

  const updateCapsules = async () => {
    const _capsules = await getReceivedCapsules();
    setCapsules(_capsules);
    setLoading(false);
  };

  useEffect(() => {
    updateCapsules();
  }, []);

  return (
    <StyledReceivedPage>
      {loading && <div>Loading</div>}
      {!loading && capsules.length === 0 && <NoCapsules isReceived />}
      <Capsules capsules={capsules} />
    </StyledReceivedPage>
  );
};

export default ReceivedPage;
