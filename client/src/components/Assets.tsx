import React, { useState } from "react";
import styled from "styled-components";
import { ethToken } from "../services/tokenService";
import Label from "../styles/Label";
import { Asset } from "../types/CapsuleType";
import Token from "../types/Token";
import TokenInput from "./TokenInput";

const StyledAssetAdder = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

type Props = {
  assets: Asset[];
  setAssets: (assets: Asset[]) => void;
};

const Assets = (props: Props) => {
  const [tokens, setTokens] = useState([ethToken]);

  return (
    <StyledAssetAdder>
      <Label>Assets</Label>
      {tokens.map((token: Token, index: number) => (
        <TokenInput
          key={index}
          token={token}
          setToken={(token: Token, value: number) => {
            const _tokens = [...tokens];
            _tokens[index] = token;
            setTokens(_tokens);

            const _assets = [...props.assets];
            _assets[index] = { token: token.address, value: value };
            props.setAssets(_assets);
          }}
        />
      ))}
    </StyledAssetAdder>
  );
};

export default Assets;
