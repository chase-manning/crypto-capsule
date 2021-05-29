import styled from "styled-components";

type Props = {
  spacing?: boolean;
};

export const ValidationError = styled.div`
  font-size: 1.7rem;
  color: var(--danger);
  margin-top: ${(props: Props) => (props.spacing ? "1rem" : "0")};
  margin-bottom: 1rem;
`;
