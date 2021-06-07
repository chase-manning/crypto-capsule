import React from "react";
import styled from "styled-components";
import BlockContent from "./BlockContent";

const StyledLoading = styled.div`
  color: var(--main);
  font-size: 2rem;
`;

const Loading = (): JSX.Element => {
  return <BlockContent content={<StyledLoading>Loading...</StyledLoading>} />;
};

export default Loading;
