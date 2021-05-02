import React, { useState } from "react";
import BN from "bn.js";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  createCapsule,
  getTokenContract,
  tokenApproved,
} from "../services/contracthelper";
import { inputToDate } from "../services/dateHelper";
import { selectTokens } from "../state/tokenSlice";
import { Asset } from "../types/CapsuleType";
import Token from "../types/Token";
import GLOBALS from "../utils/globals";
import Assets from "./Assets";
import TextInput from "./TextInput";
import Popup from "./Popup";

type Approval = {
  asset: Asset;
  approved: boolean;
};

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

type Props = {
  show: boolean;
  close: () => void;
};

const CreateCapsule = (props: Props): JSX.Element => {
  const ethAsset: Asset = { token: "ETH", value: "0" };
  const [approving, setApproving] = useState(false);
  const [beneficiary, setBeneficiary] = useState("");
  const [distributionDate, setDistributionDate] = useState("");
  const [assets, setAssets] = useState<Asset[]>([ethAsset]);
  const [approvals, setApprovals] = useState<Approval[]>([
    { asset: ethAsset, approved: true },
  ]);
  const tokens = useSelector(selectTokens);

  const unapproved = approvals.filter(
    (approval: Approval) => !approval.approved
  );

  const addressSymbol = (address: string) =>
    tokens.filter((token: Token) => token.address === address)[0].symbol;

  const updateApprovals = async (assets: Asset[]) => {
    const _approvals: Approval[] = [];
    const promises = assets.map(async (asset: Asset) => {
      _approvals.push({
        asset,
        approved: await tokenApproved(asset.token),
      });
    });
    await Promise.all(promises);
    setApprovals(_approvals);
  };

  const tokenApprove = async (address: string) => {
    const tokenContract = await getTokenContract(address);
    tokenContract.methods
      .approve(GLOBALS.CAPSULE, new BN("9999999999999999999999999999"))
      .send()
      .on("transactionHash", (hash: any) => {
        setApproving(true);
      })
      .on("receipt", (receipt: any) => {
        updateApprovals(assets).then(() => setApproving(false));
      })
      .on("error", (err: any) => {
        console.log(`Error: ${err}`);
        setApproving(false);
      });
  };

  const clearInputs = () => {
    setBeneficiary("");
    setDistributionDate("");
    setAssets([ethAsset]);
    setApprovals([{ asset: ethAsset, approved: true }]);
    setApproving(false);
  };

  const create = async () => {
    const date = inputToDate(distributionDate);
    await createCapsule(beneficiary, date, assets);
    clearInputs();
  };

  return (
    <Popup
      show={props.show}
      close={props.close}
      header="Create Capsule"
      content={
        <Content>
          <TextInput
            label="Distribution Date"
            placeholder="mm/dd/yyyy"
            maxWidth="12rem"
            tooltip="This is the date when the capsule will be able to be opened"
            value={distributionDate}
            setValue={(value: string) => setDistributionDate(value)}
          />
          <TextInput
            label="Beneficiary"
            placeholder="e.g. 0x07d48BDBA7975f0DAF73BD5b85A2E3Ff87ffb24e"
            maxWidth="43rem"
            tooltip="This is the wallet address that your crypto will be sent to on the distribution date."
            value={beneficiary}
            setValue={(value: string) => setBeneficiary(value)}
          />
          <Assets
            assets={assets}
            setAssets={(assets: Asset[]) => {
              setAssets(assets);
              updateApprovals(assets);
            }}
          />
        </Content>
      }
      buttonText={
        approving
          ? "Loading"
          : unapproved.length === 0
          ? "Create"
          : `Approve ${addressSymbol(unapproved[0].asset.token)}`
      }
      buttonAction={() => {
        if (approving) return;
        if (unapproved.length === 0) create();
        else tokenApprove(unapproved[0].asset.token);
      }}
    />
  );
};

export default CreateCapsule;
