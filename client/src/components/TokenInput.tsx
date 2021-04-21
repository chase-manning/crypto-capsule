import React, { useState } from "react";
import styled from "styled-components";
import Input from "../styles/Input";
import Token from "../types/Token";
import TokenSelector from "./TokenSelector";

const StyledTokenInput = styled.div`
  border-radius: 2rem;
  display: flex;
  padding-top: 2rem;
`;

const Container = styled.div`
  display: flex;
  padding: 1rem 0.7rem;
  align-items: center;
  border: solid 1px var(--sub);
  border-radius: 1rem;
  width: 14rem;
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
  height: 2.4rem;
  margin-right: 0.7rem;
  background-color: var(--white);
  border-radius: 50%;
`;

const Name = styled.div`
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
  setToken: (token: Token, value: number) => void;
  removeToken: () => void;
  removable: boolean;
};

const TokenInput = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("0");

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
            props.setToken(token, Number.parseFloat(value));
            setOpen(false);
          }}
        />
      </Container>
      <Input
        placeholder="0.0"
        value={value}
        onChange={(e: any) => {
          setValue(e.target.value);
          props.setToken(props.token, Number.parseFloat(e.target.value));
        }}
      />
      {props.removable && (
        <RemoveAsset onClick={() => props.removeToken()}>Remove</RemoveAsset>
      )}
    </StyledTokenInput>
  );
};

export default TokenInput;
