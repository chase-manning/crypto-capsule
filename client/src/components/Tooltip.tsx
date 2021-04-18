import React, { useState } from "react";
import styled from "styled-components";

const StyledTooltip = styled.div`
  position: relative;
  margin-left: 1rem;
`;

const HelpIcon = styled.button`
  width: 10px;
  height: 10px;
  background-color: var(--primary);
  border-radius: 50%;
  color: var(--white);
`;

const Popup = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  transform: translateX(-50%);
  height: 100px;
  width: 400px;
  padding: 1rem;
  border-radius: 30px;
  background-color: var(--white);
  color: var(--main);
  font-size: 1.3rem;
`;

type Props = {
  content: string;
};

const Tooltip = (props: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <StyledTooltip>
      <HelpIcon onClick={() => setOpen(true)}>i</HelpIcon>
      {open && <Popup>{props.content}</Popup>}
    </StyledTooltip>
  );
};

export default Tooltip;
