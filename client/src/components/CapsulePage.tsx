import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import countdown from "countdown";
import {
  getAddress,
  getCapsule,
  openCapsule,
} from "../services/contracthelper";
import { selectAddress, setAddress } from "../state/userSlice";
import CapsuleType from "../types/CapsuleType";

import capsuleOpen from "../assets/capsule-open-large.png";
import capsuleLocked from "../assets/capsule-locked-large.png";
import capsuleReady from "../assets/capsule-ready-large.png";
import Button from "./Button";
import AddAssets from "./AddAssets";
import UpdateBeneficiary from "./UpdateBeneficiary";
import { getCapsuleUsdValue } from "../services/oracleService";

const StyledCapsulePage = styled.div`
  width: 100%;
  display: flex;
  min-height: 77vh;
`;

const Loading = styled.div`
  color: var(--main);
  font-size: 2rem;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 3rem;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 3rem;
`;

const Header = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  transform: rotate(-3deg);
  color: var(--main);
`;

const SubHeader = styled.div`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  transform: rotate(-3deg);
  color: var(--sub);
`;

const CapsuleImage = styled.img`
  width: 100%;
  margin-bottom: 3rem;
`;

const Usd = styled.div`
  font-size: 4rem;
  margin-bottom: 3rem;
  transform: rotate(-3deg);
  color: var(--main);
`;

const Countdown = styled.div`
  font-size: 4rem;
  margin-bottom: 3rem;
  transform: rotate(-3deg);
  color: var(--main);
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 6rem;
  background-color: var(--primary);
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin: 1rem 0;
  }
`;

const CapsulePage = (): JSX.Element => {
  const dispatch = useDispatch();
  const address = useSelector(selectAddress);

  const { capsuleId } = useParams<any>();
  const [capsule, setCapsule] = useState<CapsuleType | null>(null);
  const [addingAssets, setAddingAssets] = useState(false);
  const [updatingBeneficiary, setUpdatingBeneficiary] = useState(false);
  const [usd, setUsd] = useState<string>("");

  const [now, setNow] = useState(new Date());
  const nowRef = useRef(now);
  nowRef.current = now;

  const open = async () => {
    if (!capsule) return;
    await openCapsule(capsule.id);
    await updateCapsule();
  };

  const isOpen = !capsule
    ? false
    : new Date(capsule.distributionDate).getTime() < nowRef.current.getTime();

  const updateCapsule = async () => {
    const address = await getAddress();
    dispatch(setAddress(address));
    const _capsule = await getCapsule(capsuleId);
    setCapsule(_capsule);
    if (!_capsule) return;
    getUsd(_capsule);
  };

  const tick = () => {
    setNow(
      new Date(nowRef.current.setSeconds(nowRef.current.getSeconds() + 1))
    );
  };

  const getUsd = async (_capsule: CapsuleType) => {
    const usdValue = await getCapsuleUsdValue(_capsule);
    setUsd(`$${Number(usdValue).toFixed(0).toLocaleString()}`);
  };

  useEffect(() => {
    setInterval(() => tick(), 1000);
    updateCapsule();

    (window as any).ethereum.on("chainChanged", async () => {
      await updateCapsule();
    });
  }, []);

  return (
    <StyledCapsulePage>
      {!capsule && <Loading>Loading...</Loading>}
      {capsule && (
        <LeftSection>
          <Header>Capsule Details</Header>
          <SubHeader>{`Grantor: ${capsule.grantor}`}</SubHeader>
          <SubHeader>{`Beneficiary: ${capsule.beneficiary}`}</SubHeader>
          <SubHeader>{`Created Date: ${capsule.createdDate}`}</SubHeader>
          <SubHeader>{`Distribution Type: ${
            capsule.periodCount === 1 ? "Immediate" : "Staggered"
          }`}</SubHeader>
          <SubHeader>{`Distribution${
            capsule.periodCount === 1 ? "" : " Start"
          } Date: ${capsule.createdDate}`}</SubHeader>
          {capsule.periodCount !== 1 && (
            <>
              <SubHeader>{`Distribution Frequency: ${capsule.periodType}`}</SubHeader>
              <SubHeader>{`Distribution Periods: ${capsule.periodCount}`}</SubHeader>
              <SubHeader>{`Claimed Periods: ${capsule.claimedPeriods}`}</SubHeader>
            </>
          )}
          <SubHeader>{`Adding Assetes Allowed: ${
            capsule.addingAssetsAllowed ? "Yes" : "No"
          }`}</SubHeader>
        </LeftSection>
      )}
      {capsule && (
        <RightSection>
          <CapsuleImage
            src={
              !isOpen
                ? capsuleLocked
                : capsule.empty
                ? capsuleOpen
                : capsuleReady
            }
          />
          {usd && usd !== "$0" && <Usd>{usd}</Usd>}
          {!isOpen && (
            <Countdown>
              {countdown(
                new Date(),
                capsule.distributionDate,
                countdown.ALL,
                3
              ).toString()}
            </Countdown>
          )}
          <ProgressContainer>meow</ProgressContainer>
          <ButtonContainer>
            {capsule.beneficiary === address && isOpen && !capsule.empty && (
              <Button text="Open" click={() => open()} />
            )}
            {capsule.grantor === address &&
              capsule.addingAssetsAllowed &&
              !isOpen && (
                <Button text="Add Assets" click={() => setAddingAssets(true)} />
              )}
            {capsule.beneficiary === address && !capsule.empty && (
              <Button
                text="Update Beneficiary"
                click={() => setUpdatingBeneficiary(true)}
              />
            )}
          </ButtonContainer>
        </RightSection>
      )}
      {capsule && (
        <AddAssets
          capsuleId={capsule.id}
          show={addingAssets}
          close={() => setAddingAssets(false)}
          updateCapsules={() => updateCapsule()}
        />
      )}
      {capsule && (
        <UpdateBeneficiary
          capsuleId={capsule.id}
          show={updatingBeneficiary}
          close={() => setUpdatingBeneficiary(false)}
          updateCapsules={() => updateCapsule()}
        />
      )}
    </StyledCapsulePage>
  );
};

export default CapsulePage;
