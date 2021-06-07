import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getReceivedCapsules } from "../services/contracthelper";
import CapsuleType from "../types/CapsuleType";
import Capsules from "./Capsules";
import Loading from "./Loading";
import NoCapsules from "./NoCapsules";

const StyledReceivedPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 77vh;
`;

const ReceivedPage = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [capsules, setCapsules] = useState<CapsuleType[]>([]);

  const updateCapsules = async () => {
    setLoading(true);
    const _capsules = await getReceivedCapsules();
    setCapsules(_capsules);
    setLoading(false);
  };

  useEffect(() => {
    updateCapsules();

    (window as any).ethereum.on("chainChanged", async () => {
      await updateCapsules();
    });
  }, []);

  return (
    <StyledReceivedPage>
      {loading && <Loading />}
      {!loading && capsules.length === 0 && (
        <NoCapsules isReceived updateCapsules={() => updateCapsules()} />
      )}
      <Capsules capsules={capsules} />
    </StyledReceivedPage>
  );
};

export default ReceivedPage;
