import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectTokens } from "../state/tokenSlice";
import Input from "../styles/Input";
import Token from "../types/Token";

type DisplayProps = {
  show: boolean;
};

const StyledTokenSelector = styled.div`
  display: ${(props: DisplayProps) => (props.show ? "flex" : "none")};
`;

const Container = styled.div`
  position: absolute;
  top: -1px;
  left: -1px;
  width: 25rem;
  padding: 1.7rem;
  border-radius: 1rem;
  background-color: var(--white);
  color: var(--main);
  font-size: 1.5rem;
  z-index: 1;
`;

const ExitEvent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Tokens = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
`;

const TokenContainer = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 0.8rem;

  :hover {
    background-color: var(--primary-light);
  }
`;

const Image = styled.img`
  width: 2.4rem;
  margin-right: 2rem;
  background-color: var(--white);
  border-radius: 50%;
`;

const Name = styled.div`
  color: var(--main);
  font-size: 1.4rem;
  font-weight: 500;
  margin-right: 1rem;
`;

type Props = {
  open: boolean;
  token: Token;
  setToken: (token: Token) => void;
};

const TokenSelector = (props: Props) => {
  const tokens = useSelector(selectTokens);
  const [search, setSearch] = useState("");

  return (
    <StyledTokenSelector show={props.open}>
      <ExitEvent onClick={() => props.setToken(props.token)} />
      <Container>
        <Input
          placeholder="Search name"
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
        />
        <Tokens>
          {tokens
            .filter((token: Token) => {
              if (!search) return true;
              return (
                token.name.substring(0, search.length).toLowerCase() ===
                search.toLowerCase()
              );
            })
            .slice(0, 10)
            .map((token: Token) => (
              <TokenContainer
                key={token.address}
                onClick={() => props.setToken(token)}
              >
                <Image src={token.logoURI} />
                <Name>{token.name}</Name>
              </TokenContainer>
            ))}
        </Tokens>
      </Container>
    </StyledTokenSelector>
  );
};

export default TokenSelector;
