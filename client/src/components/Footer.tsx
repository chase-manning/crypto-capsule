import React from "react";
import styled from "styled-components";

const StyledFooter = styled.div`
  width: 100%;
  padding: 35px 60px;
  display: flex;
  justify-content: space-between;
`;

const Text = styled.div`
  font-size: 14px;
`;

const Footer = (): JSX.Element => {
  return (
    <StyledFooter>
      <div />
      <Text>Made with ❤️in New Zealand</Text>
    </StyledFooter>
  );
};

export default Footer;
