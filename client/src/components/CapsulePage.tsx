import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import { getAddress, getCapsule } from "../services/contracthelper";
import { setAddress } from "../state/userSlice";
import CapsuleType from "../types/CapsuleType";

const StyledCapsulePage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 77vh;
`;

const CapsulePage = () => {
  const dispatch = useDispatch();

  const { capsuleId } = useParams<any>();
  const [capsule, setCapsule] = useState<CapsuleType | null>(null);

  const updateCapsule = async () => {
    const address = await getAddress();
    dispatch(setAddress(address));
    const _capsule = await getCapsule(capsuleId);
    setCapsule(_capsule);
  };

  useEffect(() => {
    updateCapsule();
  });

  return <StyledCapsulePage>{capsule?.beneficiary}</StyledCapsulePage>;
};

export default CapsulePage;
