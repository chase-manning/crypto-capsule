import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectTokens } from "../state/tokenSlice";
import Token from "../types/Token";

const StyledTokenSelector = styled.div`
  padding: 2rem;
  border-radius: 2rem;
`;

const TokenContainer = styled.button`
  display: flex;
  padding: 1rem 0.7rem;
  align-items: center;
  border: solid 1px var(--sub);
  border-radius: 1rem;
  width: 11.5rem;
  cursor: pointer;
`;

const TokenImage = styled.img`
  height: 2.4rem;
  margin-right: 0.7rem;
  background-color: var(--white);
  border-radius: 50%;
`;

const TokenName = styled.div`
  color: var(--main);
  font-size: 2rem;
  font-weight: 500;
  margin-right: 1rem;
`;

const Arrow = styled.div`
  transform: rotate(90deg);
  font-size: 2rem;
  color: var(--sub);
`;

type Props = {
  token: Token;
  setToken: (token: Token) => void;
};

const TokenSelector = (props: Props) => {
  const tokens = useSelector(selectTokens);

  return (
    <StyledTokenSelector>
      <TokenContainer>
        <TokenImage src={props.token.logoURI} />
        <TokenName>{props.token.symbol}</TokenName>
        <Arrow>{">"}</Arrow>
      </TokenContainer>
    </StyledTokenSelector>
  );
};

export default TokenSelector;
