import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { getAssetRealValue, getAssetSymbol } from "../services/contracthelper";
import { selectAddress } from "../state/userSlice";
import CapsuleType, { Asset } from "../types/CapsuleType";

import Button from "./Button";
import AddAssets from "./AddAssets";
import BlockContent from "./BlockContent";

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

type Props = {
  capsule: CapsuleType;
  update: () => void;
};

const CapsuleAssets = (props: Props): JSX.Element => {
  const address = useSelector(selectAddress);

  const [addingAssets, setAddingAssets] = useState(false);
  const [assetValues, setAssetValues] = useState<AssetValue[]>([]);
  const [assetSymbols, setAssetSymbols] = useState<AssetSymbol[]>([]);

  const isOpen = !props.capsule
    ? false
    : new Date(props.capsule.distributionDate).getTime() < new Date().getTime();

  const updateAssets = async () => {
    const _assetValues: AssetValue[] = [];
    const valuePromises = props.capsule.assets.map(async (asset: Asset) => {
      const realValue = await getAssetRealValue(asset);
      _assetValues.push({
        asset: asset.token,
        value: realValue,
      });
    });

    const _assetSymbols: AssetSymbol[] = [];
    const symbolPromises = props.capsule.assets.map(async (asset: Asset) => {
      const _symbol = await getAssetSymbol(asset.token);
      _assetSymbols.push({
        asset: asset.token,
        symbol: _symbol,
      });
    });

    await Promise.all(valuePromises);
    setAssetValues(_assetValues);
    await Promise.all(symbolPromises);
    setAssetSymbols(_assetSymbols);
  };

  useEffect(() => {
    updateAssets();
  }, []);

  return (
    <>
      <BlockContent
        content={
          <>
            <Header>Capsule Assets</Header>
            {props.capsule.assets.map((asset: Asset) => (
              <AssetContainer>
                <TokenContainer>
                  <SubHeaderMain>
                    {assetSymbols.length === props.capsule.assets.length
                      ? assetSymbols.filter(
                          (as: AssetSymbol) => as.asset === asset.token
                        )[0].symbol
                      : "---"}
                  </SubHeaderMain>
                  {asset.token !== "ETH" && (
                    <TokenAddress>{asset.token}</TokenAddress>
                  )}
                </TokenContainer>
                <SubHeaderMain>
                  {assetValues.length === props.capsule.assets.length
                    ? assetValues.filter(
                        (av: AssetValue) => av.asset === asset.token
                      )[0].value
                    : "---"}
                </SubHeaderMain>
              </AssetContainer>
            ))}
            {props.capsule.grantor === address &&
              props.capsule.addingAssetsAllowed &&
              !isOpen && (
                <Button
                  primary
                  text="Add Assets"
                  click={() => setAddingAssets(true)}
                />
              )}
          </>
        }
      />
      <AddAssets
        capsuleId={props.capsule.id}
        show={addingAssets}
        close={() => setAddingAssets(false)}
        updateCapsules={() => props.update()}
      />
    </>
  );
};

export default CapsuleAssets;
