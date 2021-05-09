import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

type Button = {
  label: string;
  route: string;
};

type Link = {
  label: string;
  link: string;
};

const buttons: Button[] = [
  {
    label: "Audit",
    route: "/sent",
  },
];

const links: Link[] = [
  {
    label: "Twitter",
    link: "xxx",
  },
  {
    label: "Discord",
    link: "xxx",
  },
  {
    label: "GitHub",
    link: "xxx",
  },
  {
    label: "Contact",
    link: "mailto: me@chasemanning.co.nz",
  },
];

const StyledFooter = styled.div`
  width: 100%;
  padding: 35px 60px;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: 3rem;
`;

const Section = styled.div`
  display: flex;
`;

const Link = styled.a`
  text-decoration: none;
  color: var(--sub);
  font-size: 1.4rem;
  margin: 0 2rem;

  :hover {
    text-decoration: underline;
  }
`;

const Button = styled.button`
  text-decoration: none;
  color: var(--sub);
  font-size: 1.4rem;
  margin: 0 2rem;

  :hover {
    text-decoration: underline;
  }
`;

const Text = styled.div`
  font-size: 1.4rem;
  color: var(--sub);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Footer = (): JSX.Element => {
  const history = useHistory();

  return (
    <StyledFooter>
      <Section>
        {buttons.map((button: Button) => (
          <Button onClick={() => history.push(button.route)} key={button.label}>
            {button.label}
          </Button>
        ))}
      </Section>
      <Text>Made with ❤️in New Zealand</Text>
      <Section>
        {links.map((link: Link) => (
          <Link
            href={link.link}
            target="_blank"
            rel="noreferrer"
            key={link.label}
          >
            {link.label}
          </Link>
        ))}
      </Section>
    </StyledFooter>
  );
};

export default Footer;
