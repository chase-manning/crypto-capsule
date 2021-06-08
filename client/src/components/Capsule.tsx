import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import countdown from "countdown";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import capsuleOpenSmall from "../assets/capsule-open-small.png";
import capsuleLockedSmall from "../assets/capsule-locked-small.png";
import capsuleReadySmall from "../assets/capsule-ready-small.png";

import Button from "./Button";
import CapsuleType, { Asset } from "../types/CapsuleType";
import { selectTokens } from "../state/tokenSlice";
import Token from "../types/Token";
import { getCapsuleUsdValue } from "../services/oracleService";
import BlockContent from "./BlockContent";
import Countdown from "./Countdown";
import { getCanBeOpened } from "../services/dateHelper";

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 27rem;
`;

const Dollars = styled.div`
  color: var(--main);
  font-size: 4rem;
  font-weight: 500;
  margin-bottom: 1rem;
  text-align: right;
`;

const Image = styled.img`
  height: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: var(--main);
  text-transform: uppercase;
  transform: translateX(-1rem);
  margin-bottom: 1rem;
`;

const Crypto = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const CyptoIconContainer = styled.div`
  width: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CryptoIcon = styled.img`
  background-color: white;
  border-radius: 50%;
  width: 2rem;
`;

type Props = {
  capsule: CapsuleType;
};

const Capsule = (props: Props): JSX.Element => {
  const history = useHistory();

  const tokens = useSelector(selectTokens);

  const [usd, setUsd] = useState("----");

  const canBeOpened = getCanBeOpened(props.capsule);

  const getUsd = async () => {
    const usdValue = await getCapsuleUsdValue(props.capsule);
    setUsd(`$${Number(usdValue).toFixed(0).toLocaleString()}`);
  };

  useEffect(() => {
    getUsd();
  }, []);

  return (
    <>
      <BlockContent
        content={
          <Content>
            {usd !== "$0" && <Dollars>{`${usd}`}</Dollars>}
            <Image
              src={
                props.capsule.empty
                  ? capsuleOpenSmall
                  : !canBeOpened
                  ? capsuleLockedSmall
                  : capsuleReadySmall
              }
            />
            <Countdown capsule={props.capsule} short />
            <Crypto>
              {props.capsule.assets.map((asset: Asset) => (
                <CyptoIconContainer key={asset.token}>
                  <CryptoIcon
                    src={
                      tokens.filter(
                        (token: Token) => token.address === asset.token
                      )[0]?.logoURI
                    }
                  />
                </CyptoIconContainer>
              ))}
            </Crypto>
            <Button
              click={() => history.push(`/capsule/${props.capsule.id}`)}
              text="View Capsule"
            />
          </Content>
        }
        marginBottom="6rem"
      />
    </>
  );
};

export default Capsule;
