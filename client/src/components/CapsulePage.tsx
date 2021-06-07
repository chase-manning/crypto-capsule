import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import dateFormat from "dateformat";

import {
  getAddress,
  getAssetRealValue,
  getAssetSymbol,
  getCapsule,
} from "../services/contracthelper";
import { selectAddress, setAddress } from "../state/userSlice";
import CapsuleType, { Asset } from "../types/CapsuleType";

import noise from "../assets/noise.png";

import Button from "./Button";
import AddAssets from "./AddAssets";
import UpdateBeneficiary from "./UpdateBeneficiary";
import Block from "./Block";
import Loading from "./Loading";
import CapsuleOverview from "./CapsuleOverview";

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
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const BlockContainer = styled.div`
  position: relative;
  transform: rotate(-4deg);
  margin: 3rem 0;
`;

const BlockContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 3rem;

  button {
    margin-top: 2rem;
  }
`;

const Header = styled.div`
  font-size: 5rem;
  margin-bottom: 2rem;
  color: var(--main);
  text-align: center;
  transform: rotate(-4deg);
  margin-top: -1rem;
`;

const SubHeaderMain = styled.span`
  font-size: 2.5rem;
  color: var(--main);
  margin-right: 1rem;
`;

const SubHeader = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--sub);
  width: 100%;
`;

const AssetContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;
`;

const TokenContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 6rem;
`;

const TokenAddress = styled.div`
  font-size: 2rem;
  color: var(--sub);
`;

type AssetValue = {
  asset: string;
  value: number;
};

type AssetSymbol = {
  asset: string;
  symbol: string;
};

const CapsulePage = (): JSX.Element => {
  const dispatch = useDispatch();
  const address = useSelector(selectAddress);

  const { capsuleId } = useParams<any>();
  const [capsule, setCapsule] = useState<CapsuleType | null>(null);
  const [addingAssets, setAddingAssets] = useState(false);
  const [updatingBeneficiary, setUpdatingBeneficiary] = useState(false);
  const [assetValues, setAssetValues] = useState<AssetValue[]>([]);
  const [assetSymbols, setAssetSymbols] = useState<AssetSymbol[]>([]);

  const isOpen = !capsule
    ? false
    : new Date(capsule.distributionDate).getTime() < new Date().getTime();

  const updateCapsule = async () => {
    const address = await getAddress();
    dispatch(setAddress(address));
    const _capsule = await getCapsule(capsuleId);
    if (!_capsule) return;

    const _assetValues: AssetValue[] = [];
    const valuePromises = _capsule?.assets.map(async (asset: Asset) => {
      const realValue = await getAssetRealValue(asset);
      _assetValues.push({
        asset: asset.token,
        value: realValue,
      });
    });

    const _assetSymbols: AssetSymbol[] = [];
    const symbolPromises = _capsule?.assets.map(async (asset: Asset) => {
      const _symbol = await getAssetSymbol(asset);
      _assetSymbols.push({
        asset: asset.token,
        symbol: _symbol,
      });
    });

    await Promise.all(valuePromises);
    setAssetValues(_assetValues);
    await Promise.all(symbolPromises);
    setAssetSymbols(_assetSymbols);

    setCapsule(_capsule);
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
            <BlockContainer>
              <Block />
              <BlockContent>
                <Header>Capsule Details</Header>
                <SubHeader>
                  <SubHeaderMain>Grantor:</SubHeaderMain>
                  {capsule.grantor}
                </SubHeader>
                <SubHeader>
                  <SubHeaderMain>Beneficiary:</SubHeaderMain>
                  {capsule.beneficiary}
                </SubHeader>
                <SubHeader>
                  <SubHeaderMain>Created Date:</SubHeaderMain>
                  {dateFormat(capsule.createdDate, "dS mmm yyyy")}
                </SubHeader>
                <SubHeader>
                  <SubHeaderMain>Distribution Type:</SubHeaderMain>
                  {capsule.periodCount === 1 ? "Immediate" : "Staggered"}
                </SubHeader>
                <SubHeader>
                  <SubHeaderMain>{`Distribution${
                    capsule.periodCount === 1 ? "" : " Start"
                  } Date:`}</SubHeaderMain>
                  {dateFormat(capsule.distributionDate, "dS mmm yyyy")}
                </SubHeader>
                {capsule.periodCount !== 1 && (
                  <>
                    <SubHeader>
                      <SubHeaderMain>Distribution Frequncy:</SubHeaderMain>
                      {capsule.periodType}
                    </SubHeader>
                    <SubHeader>
                      <SubHeaderMain>Distribution Periods:</SubHeaderMain>
                      {capsule.periodCount}
                    </SubHeader>
                    <SubHeader>
                      <SubHeaderMain>Claimed Periods:</SubHeaderMain>
                      {capsule.claimedPeriods}
                    </SubHeader>
                  </>
                )}
                <SubHeader>
                  <SubHeaderMain>Adding Assets Allowed:</SubHeaderMain>
                  {capsule.addingAssetsAllowed ? "Yes" : "No"}
                </SubHeader>
                {capsule.beneficiary === address && !capsule.empty && (
                  <Button
                    primary
                    text="Update Beneficiary"
                    click={() => setUpdatingBeneficiary(true)}
                  />
                )}
              </BlockContent>
            </BlockContainer>
            <BlockContainer>
              <Block />
              <BlockContent>
                <Header>Capsule Assets</Header>
                {capsule.assets.map((asset: Asset) => (
                  <AssetContainer>
                    <TokenContainer>
                      <SubHeaderMain>
                        {
                          assetSymbols.filter(
                            (as: AssetSymbol) => as.asset === asset.token
                          )[0].symbol
                        }
                      </SubHeaderMain>
                      {asset.token !== "ETH" && (
                        <TokenAddress>{asset.token}</TokenAddress>
                      )}
                    </TokenContainer>
                    <SubHeaderMain>
                      {
                        assetValues.filter(
                          (av: AssetValue) => av.asset === asset.token
                        )[0].value
                      }
                    </SubHeaderMain>
                  </AssetContainer>
                ))}
                {capsule.grantor === address &&
                  capsule.addingAssetsAllowed &&
                  !isOpen && (
                    <Button
                      primary
                      text="Add Assets"
                      click={() => setAddingAssets(true)}
                    />
                  )}
              </BlockContent>
            </BlockContainer>
          </Details>
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
      </CapsulePageContent>
    </StyledCapsulePage>
  );
};

export default CapsulePage;
