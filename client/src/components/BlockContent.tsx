import React from "react";
import styled from "styled-components";
import Block from "./Block";

type BlockContentProps = {
  width?: string;
  marginBottom?: string;
  large?: boolean;
};

const StyledBlockContent = styled.div`
  position: relative;
  width: ${(props: BlockContentProps) => (props.width ? props.width : "auto")};
  padding: ${(props: BlockContentProps) => (props.large ? "5rem" : "3rem")};
  padding-top: 3.3rem;
  transform: rotate(-3deg);
  margin-bottom: ${(props: BlockContentProps) =>
    props.marginBottom ? props.marginBottom : "0"};
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin-top: 2rem;
  }
`;

type Props = {
  content: JSX.Element;
  width?: string;
  marginBottom?: string;
  large?: boolean;
};

const BlockContent = (props: Props): JSX.Element => {
  return (
    <StyledBlockContent
      width={props.width}
      marginBottom={props.marginBottom}
      large={props.large}
    >
      <Block />
      <Content>{props.content}</Content>
    </StyledBlockContent>
  );
};

export default BlockContent;
