import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import Connector from "./Connector";

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

const Header = (): JSX.Element => {
  const location = useLocation();
  const history = useHistory();

  return (
    <StyledHeader>
      <Logo onClick={() => history.push("/")}>Crypto Capsule</Logo>
      <NavContainer>
        <Nav
          active={location.pathname === "/"}
          onClick={() => history.push("/")}
        >
          <Selection active={location.pathname === "/"} />
          <NavText>Home</NavText>
        </Nav>
        <Nav
          active={location.pathname === "/sent"}
          onClick={() => history.push("/sent")}
        >
          <Selection active={location.pathname === "/sent"} />
          <NavText>Sent</NavText>
        </Nav>
        <Nav
          active={location.pathname === "/received"}
          onClick={() => history.push("/received")}
        >
          <Selection active={location.pathname === "/received"} />
          <NavText>Received</NavText>
        </Nav>
        <Nav
          active={location.pathname === "/about"}
          onClick={() => history.push("/about")}
        >
          <Selection active={location.pathname === "/about"} />
          <NavText>About</NavText>
        </Nav>
      </NavContainer>
      <Connector />
    </StyledHeader>
  );
};

export default Header;
