import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getSentCapsules } from "../services/contracthelper";
import CapsuleType from "../types/CapsuleType";
import Capsules from "./Capsules";

const StyledSentPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 77vh;
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
      <Capsules capsules={capsules} />
    </StyledSentPage>
  );
};

export default SentPage;
