import styled from "styled-components";

type Props = {
  primary?: boolean;
};

const Button = styled.button`
  padding: ${(props: Props) => (props.primary ? "15px 27px" : "13px 27px")};
  font-size: 15px;
  border-radius: ${(props: Props) => (props.primary ? "24px" : "22px")};
  background-color: ${(props: Props) =>
    props.primary ? "var(--primary)" : "var(--dark)"};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default Button;
