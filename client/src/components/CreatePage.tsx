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
import Button from "../styles/Button";
import Title from "../styles/Title";
import { Asset } from "../types/CapsuleType";
import Token from "../types/Token";
import GLOBALS from "../utils/globals";
import Assets from "./Assets";
import Footer from "./Footer";
import Header from "./Header";
import TextInput from "./TextInput";

type Approval = {
  asset: Asset;
  approved: boolean;
};

const StyledCreatePage = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  margin: auto;
  margin-top: 3rem;
`;

const CreatePage = () => {
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
        asset: asset,
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
    <StyledCreatePage>
      <Header />
      <Content>
        <Title>Create Capsule</Title>
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
        <ButtonContainer>
          <Button
            primary
            onClick={() => {
              if (approving) return;
              if (unapproved.length === 0) create();
              else tokenApprove(unapproved[0].asset.token);
            }}
          >
            {approving
              ? "Loading"
              : unapproved.length === 0
              ? "Create"
              : `Approve ${addressSymbol(unapproved[0].asset.token)}`}
          </Button>
        </ButtonContainer>
      </Content>
      <Footer />
    </StyledCreatePage>
  );
};

export default CreatePage;
