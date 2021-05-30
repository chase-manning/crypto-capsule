import React, { useState } from "react";
import styled from "styled-components";
import { updateBeneficiary } from "../services/contracthelper";
import { ValidationError } from "../styles/ValidationError";
import Popup from "./Popup";
import TextInput from "./TextInput";

const StyledUpdateBeneficiary = styled.div``;

type Props = {
  show: boolean;
  close: () => void;
  capsuleId: number;
};

const UpdateBeneficiary = (props: Props): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [beneficiary, setBeneficiary] = useState("");
  const [addressError, setAddressError] = useState("");

  const validateAddress = (value: string) => {
    if (value.length !== 42) setAddressError("Invalid Address");
    else setAddressError("");
  };

  const click = async (): Promise<void> => {
    setLoading(true);
    await updateBeneficiary(props.capsuleId, beneficiary);
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
        <>
          <TextInput
            label="Beneficiary"
            placeholder="e.g. 0x07d48BDBA7975f0DAF73BD5b85A2E3Ff87ffb24e"
            tooltip="This is the wallet address that your crypto will be sent to on the distribution date"
            value={beneficiary}
            setValue={(value: string) => {
              validateAddress(value);
              setBeneficiary(value);
            }}
          />
          {addressError && <ValidationError>{addressError}</ValidationError>}
        </>
      }
    />
  );
};

export default UpdateBeneficiary;
