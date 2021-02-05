import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  border: solid 1px var(--sub);
  border-radius: 5px;
  padding: 7px;
  color: var(--main);

  :active {
    border: solid 1px var(--primary);
  }
`;

export default Input;
