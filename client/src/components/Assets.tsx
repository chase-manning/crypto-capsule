import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ethToken } from "../services/tokenService";
import { selectTokens } from "../state/tokenSlice";
import Label from "../styles/Label";
import { Asset } from "../types/CapsuleType";
import Token from "../types/Token";
import TokenInput from "./TokenInput";

const StyledAssetAdder = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const AddAsset = styled.button`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--primary);
  text-decoration: underline;
  margin-top: 1rem;
  width: 9rem;
  cursor: pointer;
`;

type Props = {
  assets: Asset[];
  setAssets: (assets: Asset[]) => void;
};

const Assets = (props: Props) => {
  const tokens = useSelector(selectTokens);

  const addAsset = () => {
    const _assets = [...props.assets];
    _assets.push({ token: "ETH", value: 0 });
    console.log(_assets);
    props.setAssets(_assets);
  };

  return (
    <StyledAssetAdder>
      <Label>Assets</Label>
      {props.assets.map((asset: Asset, index: number) => {
        if (!tokens || tokens.length === 0) return;
        const token = tokens.filter((t: Token) => t.address === asset.token)[0];

        return (
          <TokenInput
            key={index}
            token={token}
            setToken={(token: Token, value: number) => {
              const _assets = [...props.assets];
              _assets[index] = { token: token.address, value: value };
              props.setAssets(_assets);
            }}
          />
        );
      })}
      <AddAsset onClick={() => addAsset()}>+ Add Asset</AddAsset>
    </StyledAssetAdder>
  );
};

export default Assets;