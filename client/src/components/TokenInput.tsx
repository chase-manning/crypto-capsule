import React, { useState } from "react";
import styled from "styled-components";
import Token from "../types/Token";
import TokenSelector from "./TokenSelector";

const StyledTokenInput = styled.div`
  padding: 2rem;
  border-radius: 2rem;
`;

const Container = styled.div`
  display: flex;
  padding: 1rem 0.7rem;
  align-items: center;
  border: solid 1px var(--sub);
  border-radius: 1rem;
  width: 14rem;
  position: relative;
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

type Props = {
  token: Token;
  setToken: (token: Token) => void;
};

const TokenInput = (props: Props) => {
  const [open, setOpen] = useState(false);

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
            props.setToken(token);
            setOpen(false);
          }}
        />
      </Container>
    </StyledTokenInput>
  );
};

export default TokenInput;
