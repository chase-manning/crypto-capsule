import React, { useState } from "react";
import BN from "bn.js";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useHistory } from "react-router";
import { gtag } from "@deptno/gtag";
import lockedCapsule from "../assets/capsule-locked-large.png";

import {
  createCapsule,
  getAssetLongValue,
  getTokenContract,
  tokenApproved,
} from "../services/contracthelper";
import { getPeriodSize, inputToDate } from "../services/dateHelper";
import { selectTokens } from "../state/tokenSlice";
import { Asset } from "../types/CapsuleType";
import Token from "../types/Token";
import Assets from "./Assets";
import TextInput from "./TextInput";
import Popup from "./Popup";
import { ValidationError } from "../styles/ValidationError";
import Selector from "./Selector";
import Dropdown from "./Dropdown";
import { getGlobals } from "../utils/globals";

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
  if (!props.show) return <></>;

  const history = useHistory();

  const ethAsset: Asset = { token: "ETH", value: "0" };
  const approval: Approval = { asset: ethAsset, approved: true };

  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [beneficiary, setBeneficiary] = useState("");
  const [distributionDate, setDistributionDate] = useState("");
  const [periodType, setPeriodType] = useState("immediate");
  const [distributionFrequency, setDistributionFrequency] = useState("monthly");
  const [distributionPeriods, setDistributionPeriods] = useState("");
  const [distributionDateError, setDistributionDateError] = useState("");
  const [addingAssetsAllowed, setAddingAssetsAllowed] = useState("yes");
  const [addressError, setAddressError] = useState("");
  const [distributionPeriodsError, setDistributionPeriodsError] = useState("");
  const [assets, setAssets] = useState<Asset[]>([ethAsset]);
  const [approvals, setApprovals] = useState<Approval[]>([approval]);

  const tokens = useSelector(selectTokens);

  const unapproved = approvals.filter((a: Approval) => !a.approved);

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
    const globals = await getGlobals();
    const tokenContract = await getTokenContract(address);
    tokenContract.methods
      .approve(globals.CAPSULE, new BN("9999999999999999999999999999"))
      .send()
      .on("transactionHash", (hash: any) => {
        setLoading(true);
      })
      .on("receipt", async (receipt: any) => {
        await updateApprovals(assets);
        setLoading(false);
      })
      .on("error", (err: any) => {
        console.log(`Error: ${err}`);
        setLoading(false);
      });
  };

  const create = async () => {
    if (!validate()) return;

    setLoading(true);

    const _assets: Asset[] = [];

    const promises: Promise<void>[] = assets.map(async (asset: Asset) => {
      _assets.push({
        token: asset.token,
        value: await getAssetLongValue(
          Number.parseFloat(asset.value),
          asset.token
        ),
      });
    });

    await Promise.all(promises);

    const date = inputToDate(distributionDate);
    await createCapsule(
      beneficiary,
      date,
      getPeriodSize(distributionFrequency),
      periodType === "immediate" ? 1 : Number(distributionPeriods),
      _assets,
      addingAssetsAllowed === "yes"
    );

    gtag("event", "created");
    setComplete(true);
  };

  const isValid = (): boolean =>
    !addressError && !distributionPeriodsError && !distributionDateError;

  const validate = (): boolean => {
    const dateValid = validateDate(distributionDate);
    const addressValid = validateAddress(beneficiary);
    const periodsValid =
      periodType === "immediate" ? true : validatePeriods(distributionPeriods);
    return dateValid && addressValid && periodsValid;
  };

  const validateDate = (value: string): boolean => {
    try {
      const items = value.split("/");
      const newDate = new Date(`${items[2]}/${items[0]}/${items[1]}`);
      const now = new Date();
      if (items.length !== 3) setDistributionDateError("Incorrect Date format");
      else if (newDate < now)
        setDistributionDateError("Date must be in future");
      else {
        setDistributionDateError("");
        return true;
      }
    } catch {
      setDistributionDateError("Incorrect Date format");
    }
    return false;
  };

  const validateAddress = (value: string): boolean => {
    if (value.length !== 42) setAddressError("Invalid Address");
    else {
      setAddressError("");
      return true;
    }
    return false;
  };

  const validatePeriods = (value: string): boolean => {
    let periods = 0;
    try {
      periods = Number(value);
      if (periods <= 0)
        setDistributionPeriodsError("Periods must be a positive number");
      else if (periods === 1)
        setDistributionPeriodsError(
          "For only one period, use an Immediate Capsule"
        );
      else {
        setDistributionPeriodsError("");
        return true;
      }
    } catch {
      setDistributionPeriodsError("Invalid Number");
    }
    return false;
  };

  return (
    <>
      <Popup
        show={!complete}
        close={props.close}
        header="Create Capsule"
        content={
          <Content>
            <Selector
              options={["immediate", "staggered"]}
              activeOption={periodType}
              setOption={(option: string) => {
                setPeriodType(option);
                setDistributionPeriodsError("");
              }}
              label="Distribution Type"
              tooltip="An Immediate Capsule will open completely on the distribution date, allowing all crypto to be accessed at once. A Staggered Capsule will first open on the Distribution Start Date for a portion of the crypto, and more crypto will become accessible at the defined intervals"
            />
            <TextInput
              label={
                periodType === "immediate"
                  ? "Distribution Date"
                  : "Distribution Start Date"
              }
              placeholder="mm/dd/yyyy"
              tooltip={
                periodType === "immediate"
                  ? "This is the date when the capsule will be able to be opened"
                  : "This is the date when the capsule will first be able to be opened"
              }
              value={distributionDate}
              setValue={(value: string) => {
                validateDate(value);
                setDistributionDate(value);
              }}
            />
            {distributionDateError && (
              <ValidationError>{distributionDateError}</ValidationError>
            )}
            {periodType === "staggered" && (
              <>
                <Dropdown
                  label="Distribution Frequency"
                  tooltip="How often the crypto should be distributed to the beneficiary after the capsule is opened"
                  options={["daily", "weekly", "monthly", "annually"]}
                  activeOption={distributionFrequency}
                  setOption={(option: string) =>
                    setDistributionFrequency(option)
                  }
                />
                <TextInput
                  label="Distribution Periods"
                  placeholder="e.g. 12"
                  tooltip="How many periods the crypto should be spread out over for the staggerd distribution"
                  value={distributionPeriods}
                  setValue={(value: string) => {
                    validatePeriods(value);
                    setDistributionPeriods(value);
                  }}
                />
                {distributionPeriodsError && (
                  <ValidationError>{distributionPeriodsError}</ValidationError>
                )}
              </>
            )}
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
            <Selector
              options={["yes", "no"]}
              activeOption={addingAssetsAllowed}
              setOption={(option: string) => setAddingAssetsAllowed(option)}
              label="Adding Assets Allowed"
              tooltip="Controls if you are able to continue to add assets to the capsule after it has been created. 'Yes' will mean you can keep adding assets after it has been created. 'No' means that you can only add assets once when it is created."
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
          unapproved.length === 0
            ? "Create"
            : `Approve ${addressSymbol(unapproved[0].asset.token)}`
        }
        buttonAction={() => {
          if (unapproved.length === 0) create();
          else tokenApprove(unapproved[0].asset.token);
        }}
        loading={loading}
        buttonDisabled={!isValid()}
      />
      <Popup
        show={complete}
        close={props.close}
        header="Capsule Created!"
        image={lockedCapsule}
        body="Click below to view your capsule"
        buttonText="View Capsule"
        buttonAction={() => history.push("/sent")}
      />
    </>
  );
};

export default CreateCapsule;
