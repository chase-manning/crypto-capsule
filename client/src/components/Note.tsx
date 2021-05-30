import React from "react";
import styled from "styled-components";
import Block from "./Block";

const StyledNote = styled.div`
  position: relative;
  width: 60vw;
  padding: 5rem;
  padding-top: 3.3rem;
  transform: rotate(-3deg);
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h2`
  color: var(--main);
  font-size: 8rem;
  font-weight: 600;
  width: 100%;
  text-align: center;
  margin-bottom: 3rem;
`;

const Body = styled.p`
  color: var(--sub);
  font-size: 3rem;
  font-weight: 500;
  width: 100%;
`;

type Props = {
  header: string;
  body: string;
};

const Note = (props: Props): JSX.Element => {
  return (
    <StyledNote>
      <Block />
      <Content>
        <Header>{props.header}</Header>
        <Body>{props.body}</Body>
      </Content>
    </StyledNote>
  );
};

export default Note;
