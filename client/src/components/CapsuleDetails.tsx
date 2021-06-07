import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import dateFormat from "dateformat";

import { selectAddress } from "../state/userSlice";
import CapsuleType from "../types/CapsuleType";

import Button from "./Button";
import UpdateBeneficiary from "./UpdateBeneficiary";
import BlockContent from "./BlockContent";

const Header = styled.div`
  font-size: 5rem;
  margin-bottom: 2rem;
  color: var(--main);
  text-align: center;
  transform: rotate(-4deg);
  margin-top: -1rem;
`;

const SubHeaderMain = styled.span`
  font-size: 2.5rem;
  color: var(--main);
  margin-right: 1rem;
`;

const SubHeader = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--sub);
  width: 100%;
`;

type Props = {
  capsule: CapsuleType;
  update: () => void;
};

const CapsuleDetails = (props: Props): JSX.Element => {
  const address = useSelector(selectAddress);

  const [updatingBeneficiary, setUpdatingBeneficiary] = useState(false);

  return (
    <>
      <BlockContent
        content={
          <>
            <Header>Capsule Details</Header>
            <SubHeader>
              <SubHeaderMain>Grantor:</SubHeaderMain>
              {props.capsule.grantor}
            </SubHeader>
            <SubHeader>
              <SubHeaderMain>Beneficiary:</SubHeaderMain>
              {props.capsule.beneficiary}
            </SubHeader>
            <SubHeader>
              <SubHeaderMain>Created Date:</SubHeaderMain>
              {dateFormat(props.capsule.createdDate, "dS mmm yyyy")}
            </SubHeader>
            <SubHeader>
              <SubHeaderMain>Distribution Type:</SubHeaderMain>
              {props.capsule.periodCount === 1 ? "Immediate" : "Staggered"}
            </SubHeader>
            <SubHeader>
              <SubHeaderMain>{`Distribution${
                props.capsule.periodCount === 1 ? "" : " Start"
              } Date:`}</SubHeaderMain>
              {dateFormat(props.capsule.distributionDate, "dS mmm yyyy")}
            </SubHeader>
            {props.capsule.periodCount !== 1 && (
              <>
                <SubHeader>
                  <SubHeaderMain>Distribution Frequncy:</SubHeaderMain>
                  {props.capsule.periodType}
                </SubHeader>
                <SubHeader>
                  <SubHeaderMain>Distribution Periods:</SubHeaderMain>
                  {props.capsule.periodCount}
                </SubHeader>
                <SubHeader>
                  <SubHeaderMain>Claimed Periods:</SubHeaderMain>
                  {props.capsule.claimedPeriods}
                </SubHeader>
              </>
            )}
            <SubHeader>
              <SubHeaderMain>Adding Assets Allowed:</SubHeaderMain>
              {props.capsule.addingAssetsAllowed ? "Yes" : "No"}
            </SubHeader>
            {props.capsule.beneficiary === address && !props.capsule.empty && (
              <Button
                primary
                text="Update Beneficiary"
                click={() => setUpdatingBeneficiary(true)}
              />
            )}
            <UpdateBeneficiary
              capsuleId={props.capsule.id}
              show={updatingBeneficiary}
              close={() => setUpdatingBeneficiary(false)}
              updateCapsules={() => props.update()}
            />
          </>
        }
      />
      ;
    </>
  );
};

export default CapsuleDetails;
