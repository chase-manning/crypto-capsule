import styled from "styled-components";

type Props = {
  primary?: boolean;
};

const Button = styled.button`
  padding: 13px 27px;
  font-size: 14px;
  border-radius: 21px;
  background-color: ${(props: Props) =>
    props.primary ? "var(--primary)" : "var(--dark)"};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default Button;
