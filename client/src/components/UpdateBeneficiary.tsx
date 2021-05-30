import React, { useState } from "react";
import styled from "styled-components";
import { updateBeneficiary } from "../services/contracthelper";
import { ValidationError } from "../styles/ValidationError";
import Popup from "./Popup";
import TextInput from "./TextInput";

const StyledUpdateBeneficiary = styled.div`
  width: 100%;
`;

type Props = {
  show: boolean;
  close: () => void;
  capsuleId: number;
  updateCapsules: () => void;
};

const UpdateBeneficiary = (props: Props): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [beneficiary, setBeneficiary] = useState("");
  const [addressError, setAddressError] = useState("");

  const validateAddress = (value: string): boolean => {
    if (value.length !== 42) {
      setAddressError("Invalid Address");
      return false;
    }
    setAddressError("");
    return true;
  };

  const click = async () => {
    if (!validateAddress(beneficiary)) return;
    setLoading(true);
    await updateBeneficiary(props.capsuleId, beneficiary);
    props.updateCapsules();
    setLoading(false);
    props.close();
  };

  return (
    <Popup
      show={props.show}
      close={() => props.close()}
      header="Update Beneficiary"
      buttonText={loading ? "Loading" : "Update"}
      buttonAction={() => {
        if (!loading) click();
      }}
      content={
        <StyledUpdateBeneficiary>
          <TextInput
            label="New Beneficiary"
            placeholder="e.g. 0x07d48BDBA7975f0DAF73BD5b85A2E3Ff87ffb24e"
            tooltip="This is the new wallet address that the crypto will be sent to on the distribution date"
            value={beneficiary}
            setValue={(value: string) => {
              validateAddress(value);
              setBeneficiary(value);
            }}
          />
          {addressError && <ValidationError>{addressError}</ValidationError>}
        </StyledUpdateBeneficiary>
      }
    />
  );
};

export default UpdateBeneficiary;
