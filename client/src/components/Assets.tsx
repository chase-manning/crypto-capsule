import React, { useState } from "react";
import styled from "styled-components";
import { ethToken } from "../services/tokenService";
import Label from "../styles/Label";
import Token from "../types/Token";
import TokenSelector from "./TokenSelector";

const StyledAssetAdder = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const Assets = () => {
  const [tokens, setTokens] = useState([ethToken]);
  return (
    <StyledAssetAdder>
      <Label>Assets</Label>
      {tokens.map((token: Token, index: number) => (
        <TokenSelector
          key={index}
          token={token}
          setToken={(token: Token) => {
            const _tokens = [...tokens];
            _tokens[index] = token;
            setTokens(_tokens);
          }}
        />
      ))}
    </StyledAssetAdder>
  );
};

export default Assets;
