import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getReceivedCapsules } from "../services/contracthelper";
import CapsuleType from "../types/CapsuleType";
import Capsules from "./Capsules";

const StyledReceivedPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReceivedPage = (): JSX.Element => {
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
      <Capsules capsules={capsules} />
    </StyledReceivedPage>
  );
};

export default ReceivedPage;
