import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ethBalance, tokenBalance } from "../services/contracthelper";
import { toCents } from "../services/web3Service";
import Input from "../styles/Input";
import Token from "../types/Token";
import TokenSelector from "./TokenSelector";

const StyledTokenInput = styled.div`
  border-radius: 2rem;
  display: flex;
  padding-top: 1rem;
`;

const Container = styled.div`
  display: flex;
  padding: 1rem;
  border: solid 1px var(--sub);
  align-items: center;
  border-radius: 0.5rem;
  width: 13rem;
  position: relative;
  margin-right: 3rem;
`;

const OpenButton = styled.button`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  cursor: pointer;
`;

const Image = styled.img`
  height: 1.6rem;
  margin-right: 1rem;
  background-color: var(--bg);
  border-radius: 50%;
`;

const Name = styled.div`
  color: var(--main);
  font-size: 1.6rem;
  font-weight: 500;
  margin-right: 1rem;
`;

const Arrow = styled.div`
  font-size: 2rem;
  color: var(--sub);
  position: absolute;
  font-weight: 200;
  font-family: Arial, Helvetica, sans-serif;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%) rotate(90deg);
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
`;

const MaxButton = styled.button`
  font-size: 1.4rem;
  text-transform: uppercase;
  color: var(--primary);
  font-weight: 600;
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  height: 2rem;
  background-color: var(--bg);
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RemoveAsset = styled.button`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--primary);
  text-decoration: underline;
  width: 9rem;
  cursor: pointer;
  margin-left: 1rem;
`;

type Props = {
  token: Token;
  setToken: (token: Token, value: string) => void;
  removeToken: () => void;
  removable: boolean;
};

const TokenInput = (props: Props): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("0");
  const [balance, setBalance] = useState(0);

  const updateBalance = async (token: Token) => {
    if (token.address === "ETH") {
      const _balance = await ethBalance();
      setBalance(_balance);
    } else {
      const _balance = await tokenBalance(token);
      setBalance(_balance);
    }
  };

  useEffect(() => {
    updateBalance(props.token);
  }, []);

  return (
    <StyledTokenInput>
      <Container>
        <Image src={props.token.logoURI} />
        <Name>{props.token.symbol}</Name>
        <Arrow>{">"}</Arrow>
        <OpenButton onClick={() => setOpen(true)} />
        <TokenSelector
          open={open}
          token={props.token}
          setToken={(token: Token) => {
            props.setToken(token, toCents(Number.parseFloat(value), token));
            updateBalance(token);
            setOpen(false);
          }}
        />
      </Container>
      <InputContainer>
        <Input
          placeholder="0.0"
          value={value}
          onChange={(e: any) => {
            setValue(e.target.value);
            props.setToken(
              props.token,
              toCents(Number.parseFloat(e.target.value), props.token)
            );
          }}
        />
        <MaxButton onClick={() => setValue(balance.toString())}>max</MaxButton>
      </InputContainer>
      {props.removable && (
        <RemoveAsset onClick={() => props.removeToken()}>Remove</RemoveAsset>
      )}
    </StyledTokenInput>
  );
};

export default TokenInput;
