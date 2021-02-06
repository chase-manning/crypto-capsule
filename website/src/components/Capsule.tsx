import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import dateformat from "dateformat";

export type CapsuleType = {
  open: Date;
  address: string;
  eth: number;
  dollars: number;
};

const StyledCapsule = styled.div`
  width: 100%;
  height: 140px;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px var(--sub);
`;

const OpenImage = styled.div`
  height: 100%;
  width: 120px;
  background-color: pink;
`;

const ClosedImage = styled.div`
  height: 100%;
  width: 120px;
  background-color: yellow;
`;

const CountdownContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  padding: 0 30px;
`;

const Countdown = styled.div`
  color: var(--main);
  font-size: 30px;
  font-weight: 500;
`;

const OpenDate = styled.div`
  color: var(--sub);
  font-size: 16px;
`;

type Props = {
  capsule: CapsuleType;
};

const Capsule = (props: Props) => {
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

  const open = props.capsule.open.getTime() < nowRef.current.getTime();
  const remaining = open
    ? 0
    : props.capsule.open.getTime() - nowRef.current.getTime();
  const yearsMult = 1000 * 60 * 60 * 24 * 365;
  const years = Math.trunc(remaining / yearsMult);
  const daysMult = 1000 * 60 * 60 * 24;
  const hoursMult = 1000 * 60 * 60;
  const daysRemaining = remaining - years * yearsMult;
  const days = Math.trunc(daysRemaining / daysMult);
  const hoursRemaining = remaining - years * yearsMult - days * daysMult;
  const hours = Math.trunc(hoursRemaining / hoursMult);
  const minutesMult = 1000 * 60;
  const minutesRemaining =
    remaining - years * yearsMult - days * daysMult - hours * hoursMult;
  const minutes = Math.trunc(minutesRemaining / minutesMult);
  const secondsMult = 1000;
  const secondsRemaining =
    remaining -
    years * yearsMult -
    days * daysMult -
    hours * hoursMult -
    minutes * minutesMult;
  const seconds = Math.trunc(secondsRemaining / secondsMult);

  return (
    <StyledCapsule>
      {open && <OpenImage />}
      {!open && <ClosedImage />}
      <CountdownContainer>
        <Countdown>
          {(years > 0 ? years + "y " : "") +
            (days > 0 ? days + "d " : "") +
            (hours > 0 ? hours + "h " : "") +
            (minutes > 0 ? minutes + "m " : "") +
            (seconds > 0 ? seconds + "s" : "")}
        </Countdown>
        <OpenDate>
          {dateformat(props.capsule.open, "hh:MM dd/mm/yyyy")}
        </OpenDate>
      </CountdownContainer>
    </StyledCapsule>
  );
};

export default Capsule;
