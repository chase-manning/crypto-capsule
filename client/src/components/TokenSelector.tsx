import React from "react";
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
  width: 30rem;
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

type Props = {
  open: boolean;
  token: Token;
  setToken: (token: Token) => void;
};

const TokenSelector = (props: Props) => {
  const tokens = useSelector(selectTokens);

  return (
    <StyledTokenSelector show={props.open}>
      <ExitEvent onClick={() => props.setToken(props.token)} />
      <Container>
        <Input placeholder="Search name or paste address" />
      </Container>
    </StyledTokenSelector>
  );
};

export default TokenSelector;
