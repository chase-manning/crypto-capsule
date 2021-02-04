import React from "react";
import styled from "styled-components";
import Button from "../styles/Button";

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 60px;
`;

const Logo = styled.button`
  color: var(--main);
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
`;

const NavContainer = styled.div`
  display: flex;
`;

type NavProps = {
  active: boolean;
};

const Nav = styled.button`
  width: 100px;
  transition: color 0.3s;

  color: ${(props: NavProps) => (props.active ? "var(--main)" : "var(--sub)")};
  :hover {
    color: var(--main);
  }
  cursor: pointer;
`;

const NavText = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 35px;
  font-size: 14px;
`;

const Selection = styled.div`
  width: 100%;
  font-size: 12px;
  height: 4px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  margin-bottom: 30px;
  background-color: ${(props: NavProps) =>
    props.active ? "var(--primary)" : "rgba(0,0,0,0)"};
`;

const LoginContainer = styled.div`
  display: flex;
`;

const LoginButton = styled.button`
  width: 90px;
  height: 42px;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Logo>Crypto Capsule</Logo>
      <NavContainer>
        <Nav active={true}>
          <Selection active={true} />
          <NavText>Create</NavText>
        </Nav>
        <Nav active={false}>
          <Selection active={false} />
          <NavText>Sent</NavText>
        </Nav>
        <Nav active={false}>
          <Selection active={false} />
          <NavText>Received</NavText>
        </Nav>
        <Nav active={false}>
          <Selection active={false} />
          <NavText>About</NavText>
        </Nav>
      </NavContainer>
      <LoginContainer>
        <LoginButton>Login</LoginButton>
        <Button>Sign Up</Button>
      </LoginContainer>
    </StyledHeader>
  );
};

export default Header;
