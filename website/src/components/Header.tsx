import React from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 60px;
`;

const Logo = styled.div`
  color: var(--main);
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
`;

const NavContainer = styled.div`
  display: flex;
`;

const Nav = styled.div`
  width: 100px;
  cursor: pointer;
`;

type NavProps = {
  active: boolean;
};

const NavText = styled.div`
  width: 100%;
  text-align: center;
  color: ${(props: NavProps) => (props.active ? "var(--main)" : "var(--sub)")};
  margin-bottom: 35px;
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

const LoginButton = styled.div`
  width: 90px;
  height: 40px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SignUpButton = styled.div`
  width: 110px;
  height: 40px;
  font-size: 14px;
  border-radius: 20px;
  background-color: var(--dark);
  color: white;
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
        <Nav>
          <Selection active={true} />
          <NavText active={true}>Create</NavText>
        </Nav>
        <Nav>
          <Selection active={false} />
          <NavText active={false}>Sent</NavText>
        </Nav>
        <Nav>
          <Selection active={false} />
          <NavText active={false}>Received</NavText>
        </Nav>
        <Nav>
          <Selection active={false} />
          <NavText active={false}>About</NavText>
        </Nav>
      </NavContainer>
      <LoginContainer>
        <LoginButton>Login</LoginButton>
        <SignUpButton>Sign Up</SignUpButton>
      </LoginContainer>
    </StyledHeader>
  );
};

export default Header;
