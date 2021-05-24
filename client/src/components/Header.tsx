import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import Connector from "./Connector";

type NavItem = {
  label: string;
  route: string;
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    route: "",
  },
  {
    label: "Sent",
    route: "sent",
  },
  {
    label: "Received",
    route: "received",
  },
];

const StyledHeader = styled.div`
  width: 100%;
  height: 13rem;
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
  flex-direction: row-reverse;
`;

const Header = (): JSX.Element => {
  const location = useLocation();
  const history = useHistory();

  const navItems = [...NAV_ITEMS];
  navItems.reverse();

  return (
    <StyledHeader>
      <Logo onClick={() => history.push("/")}>Crypto Capsule</Logo>
      <NavContainer>
        {navItems.map((navItem: NavItem) => (
          <Button
            text={navItem.label}
            click={() => history.push(`/${navItem.route}`)}
            selected={location.pathname === `/${navItem.route}`}
          />
        ))}
      </NavContainer>
      <Connector />
    </StyledHeader>
  );
};

export default Header;
