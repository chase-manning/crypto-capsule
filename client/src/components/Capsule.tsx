import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import dateformat from "dateformat";
import Button from "../styles/Button";
import CapsuleType from "../types/CapsuleType";
type CapsuleProps = {
  last: boolean;
};

const StyledCapsule = styled.div`
  width: 100%;
  height: 140px;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px
    ${(props: CapsuleProps) => (props.last ? "rgba(0,0,0,0)" : "var(--sub)")};
`;

const Image = styled.div`
  height: 100%;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: var(--main);
  text-transform: uppercase;
`;

const OpenImage = styled(Image)`
  background-color: pink;
`;

const ClosedImage = styled(Image)`
  background-color: lightgreen;
`;

const ReadyImage = styled(Image)`
  background-color: lightblue;
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

const ValueContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  padding: 0 30px;
`;

const Dollars = styled.div`
  color: var(--main);
  font-size: 30px;
  font-weight: 500;
  text-align: right;
`;

const Crypto = styled.div`
  color: var(--sub);
  font-size: 16px;
  text-align: right;
`;

type Props = {
  capsule: CapsuleType;
  last: boolean;
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

  const open =
    new Date(props.capsule.distributionDate).getTime() <
    nowRef.current.getTime();
  const remaining = open
    ? 0
    : new Date(props.capsule.distributionDate).getTime() -
      nowRef.current.getTime();
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
    <StyledCapsule last={props.last}>
      {open && props.capsule.opened && <OpenImage>asset 2</OpenImage>}
      {open && !props.capsule.opened && <ReadyImage>asset 3</ReadyImage>}
      {!open && <ClosedImage>asset 4</ClosedImage>}
      <CountdownContainer>
        <Countdown>
          {open ? "0y 0d 0h 0m 0s" : ""}
          {(years > 0 ? years + "y " : "") +
            (days > 0 ? days + "d " : "") +
            (hours > 0 ? hours + "h " : "") +
            (minutes > 0 ? minutes + "m " : "") +
            (seconds > 0 ? seconds + "s" : "")}
        </Countdown>
        <OpenDate>
          {dateformat(props.capsule.distributionDate, "hh:MM dd/mm/yyyy")}
        </OpenDate>
      </CountdownContainer>
      <ValueContainer>
        {/* TODO Set Price */}
        <Dollars>{"$" + (100).toLocaleString()}</Dollars>
        {/* TODO Set Value */}
        <Crypto>{10 + " ETH"}</Crypto>
      </ValueContainer>
      {open && !props.capsule.opened && <Button primary>Open</Button>}
      {!open && <Button>Top Up</Button>}
    </StyledCapsule>
  );
};

export default Capsule;
