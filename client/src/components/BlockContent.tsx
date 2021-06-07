import React from "react";
import styled from "styled-components";
import Block from "./Block";

type BlockContentProps = {
  width?: string;
};

const StyledBlockContent = styled.div`
  position: relative;
  width: ${(props: BlockContentProps) => (props.width ? props.width : "auto")};
  padding: 5rem;
  padding-top: 3.3rem;
  transform: rotate(-3deg);
`;

const Content = styled.div`
  position: relative;
  width: 100%;
`;

type Props = {
  content: JSX.Element;
  width?: string;
};

const BlockContent = (props: Props): JSX.Element => {
  return (
    <StyledBlockContent width={props.width}>
      <Block />
      <Content>{props.content}</Content>
    </StyledBlockContent>
  );
};

export default BlockContent;