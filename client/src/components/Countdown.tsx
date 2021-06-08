import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import countdown from "countdown";
import CapsuleType from "../types/CapsuleType";
import { getCanBeOpened, getNextOpenDate } from "../services/dateHelper";

type CountdownProps = {
  short?: boolean;
};

const StyledCountdown = styled.div`
  font-size: ${(props: CountdownProps) => (props.short ? "3rem" : "6rem")};
  transform: ${(props: CountdownProps) =>
    props.short ? "none" : "rotate(-3deg)"};
  color: var(--main);
  margin-bottom: ${(props: CountdownProps) => (props.short ? "0" : "2rem")};
`;

type Props = {
  capsule: CapsuleType;
  short?: boolean;
};

const Countdown = (props: Props): JSX.Element => {
  const [now, setNow] = useState(new Date());
  const nowRef = useRef(now);
  nowRef.current = now;

  const canBeOpened = getCanBeOpened(props.capsule);
  const nextOpen = getNextOpenDate(props.capsule);

  const tick = () => {
    setNow(
      new Date(nowRef.current.setSeconds(nowRef.current.getSeconds() + 1))
    );
  };

  useEffect(() => {
    setInterval(() => tick(), 1000);
  }, []);

  return (
    <StyledCountdown short={props.short}>
      {props.capsule.empty
        ? "Capsule is Empty"
        : canBeOpened
        ? "Ready to Open"
        : countdown(
            new Date(),
            nextOpen,
            countdown.ALL,
            props.short ? 2 : 3
          ).toString()}
    </StyledCountdown>
  );
};

export default Countdown;
