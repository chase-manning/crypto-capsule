import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";

import { getAddress, getCapsule } from "../services/contracthelper";
import { setAddress } from "../state/userSlice";
import CapsuleType from "../types/CapsuleType";

import noise from "../assets/noise.png";

import Loading from "./Loading";
import CapsuleOverview from "./CapsuleOverview";
import CapsuleDetails from "./CapsuleDetails";
import CapsuleAssets from "./CapsuleAssets";

const StyledCapsulePage = styled.div`
  position: relative;
  width: 100%;
`;

const Gradient = styled.div`
  position: absolute;
  top: -13rem;
  left: 0;
  width: 100%;
  height: calc(100% + 13rem + 11rem);
  background: linear-gradient(
    90deg,
    var(--bg),
    var(--sub),
    var(--bg),
    var(--bg)
  );
  opacity: 0.5;
`;

const Noise = styled.div`
  position: absolute;
  top: -13rem;
  left: 0;
  width: 100%;
  height: calc(100% + 13rem + 11rem);
  background-image: url(${noise});
  background-size: 5px 5px;
  opacity: 1;
`;

const CapsulePageContent = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  min-height: 77vh;
  align-items: center;
  justify-content: space-evenly;

  @media (max-width: 600px) {
    flex-direction: column;
    margin: 6rem 0;
  }
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const CapsulePage = (): JSX.Element => {
  const dispatch = useDispatch();

  const { capsuleId } = useParams<any>();
  const [capsule, setCapsule] = useState<CapsuleType | null>(null);

  const updateCapsule = async () => {
    dispatch(setAddress(await getAddress()));
    setCapsule(await getCapsule(capsuleId));
  };

  useEffect(() => {
    updateCapsule();

    (window as any).ethereum.on("chainChanged", async () => {
      await updateCapsule();
    });
  }, []);

  return (
    <StyledCapsulePage>
      <Noise />
      <Gradient />
      <CapsulePageContent>
        {!capsule && <Loading />}
        {capsule && (
          <CapsuleOverview capsule={capsule} update={() => updateCapsule()} />
        )}
        {capsule && (
          <Details>
            <CapsuleDetails capsule={capsule} update={() => updateCapsule()} />
            <CapsuleAssets capsule={capsule} update={() => updateCapsule()} />
          </Details>
        )}
      </CapsulePageContent>
    </StyledCapsulePage>
  );
};

export default CapsulePage;
