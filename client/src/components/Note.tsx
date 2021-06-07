import React from "react";
import styled from "styled-components";
import BlockContent from "./BlockContent";

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
    <BlockContent
      content={
        <Content>
          <Header>{props.header}</Header>
          <Body>{props.body}</Body>
        </Content>
      }
      width="60vw"
      large
    />
  );
};

export default Note;
