import React, { useRef, useState } from "react";
import styled from "styled-components";

const StyledTooltip = styled.div`
  position: relative;
  margin-left: 1rem;
`;

const ExitEvent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const HelpIcon = styled.button`
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
  font-weight: 500;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bg);
  border: solid 1px var(--primary);
  color: var(--primary);
  outline: none;
  cursor: pointer;
  padding-right: 0.4rem;
`;

const Indicator = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: var(--bg);
  position: absolute;
  top: 200%;
  left: 30%;
  transform: rotate(45deg) translateX(-50%);
  border-radius: 0.2rem;
  z-index: 2;
`;

type PopupProps = {
  top: string;
};

const Popup = styled.div`
  position: fixed;
  top: ${(props: PopupProps) => props.top};
  left: calc(100vw / 2);
  transform: translateX(-50%);
  width: 500px;
  padding: 1.7rem;
  border-radius: 1rem;
  background-color: var(--bg);
  color: var(--main);
  font-size: 2.1rem;
  z-index: 2;

  @media (max-width: 600px) {
    width: 90vw;
  }
`;

type Props = {
  content: string;
};

const Tooltip = (props: Props): JSX.Element => {
  const [open, setOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  return (
    <StyledTooltip ref={tooltipRef}>
      {open && <ExitEvent onClick={() => setOpen(false)} />}
      <HelpIcon onClick={() => setOpen(true)}>?</HelpIcon>
      {open && (
        <>
          <Indicator />
          <Popup
            top={`${
              tooltipRef.current
                ? tooltipRef.current?.getBoundingClientRect().bottom +
                  tooltipRef.current?.getBoundingClientRect().height
                : 0
            }px`}
          >
            {props.content}
          </Popup>
        </>
      )}
    </StyledTooltip>
  );
};

export default Tooltip;
