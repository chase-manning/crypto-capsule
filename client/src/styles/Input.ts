import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  border: solid 1px var(--sub);
  border-radius: 5px;
  padding: 10px;
  color: var(--main);
  margin-top: 8px;
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0);

  :active {
    border: solid 1px var(--primary);
  }
`;

export default Input;
