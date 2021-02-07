import styled from "styled-components";

type Props = {
  primary?: boolean;
};

const Button = styled.button`
  padding: ${(props: Props) => (props.primary ? "18px 34px" : "13px 27px")};
  font-size: ${(props: Props) => (props.primary ? "18px" : "15px")};
  border-radius: ${(props: Props) => (props.primary ? "29px" : "22px")};
  background-color: ${(props: Props) =>
    props.primary ? "var(--primary)" : "var(--dark)"};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: ${(props: Props) =>
    props.primary ? "5px 5px 40px rgba(22, 97, 244, 0.6)" : "none"};
  transition: all 0.3s;

  :hover {
    box-shadow: ${(props: Props) =>
      props.primary ? "2px 2px 20px rgba(22, 97, 244, 0.6)" : "none"};
  }
`;

export default Button;
