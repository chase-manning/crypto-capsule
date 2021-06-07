import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import countdown from "countdown";
import CapsuleType from "../types/CapsuleType";

const StyledCountdown = styled.div`
  font-size: 6rem;
  margin-bottom: 3rem;
  transform: rotate(-3deg);
  color: var(--main);
`;

type Props = {
  capsule: CapsuleType;
  short?: boolean;
};

const Countdown = (props: Props): JSX.Element => {
  const [now, setNow] = useState(new Date());
  const nowRef = useRef(now);
  nowRef.current = now;

  const tick = () => {
    setNow(
      new Date(nowRef.current.setSeconds(nowRef.current.getSeconds() + 1))
    );
  };

  useEffect(() => {
    setInterval(() => tick(), 1000);
  }, []);

  return (
    <StyledCountdown>
      {countdown(
        new Date(),
        props.capsule.distributionDate,
        countdown.ALL,
        props.short ? 2 : 3
      ).toString()}
    </StyledCountdown>
  );
};

export default Countdown;
