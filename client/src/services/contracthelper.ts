import { Contract } from "web3-eth-contract";
import Web3 from "web3";
import BN from "bn.js";
import GLOBALS from "../utils/globals";
import capsuleAbi from "../contracts/CryptoCapsule.json";
import tokenAbi from "../contracts/IERC20.json";
import { toEthUnit } from "./web3Service";
import { dateToUnix, getPeriodType, UnixToDate } from "./dateHelper";
import CapsuleType, { Asset } from "../types/CapsuleType";
import ContractCapsuleType from "../types/ContractCapsuleType";
import Token from "../types/Token";

// Shared
export const getAddress = async (): Promise<string> => {
  if ((window as any).ethereum) {
    (window as any).web3 = new Web3((window as any).ethereum);
    (window as any).ethereum.enable();
    const addressList = await (window as any).web3.eth.getAccounts();
    return addressList[0];
  }
  return "";
};

export const getCapsuleContract = async (): Promise<Contract> => {
  return new (window as any).web3.eth.Contract(capsuleAbi, GLOBALS.CAPSULE, {
    from: await getAddress(),
  });
};

export const getTokenContract = async (token: string): Promise<Contract> => {
  return new (window as any).web3.eth.Contract(tokenAbi, token, {
    from: await getAddress(),
  });
};

// Functions
export const createCapsule = async (
  beneficiary: string,
  distributionDate: Date,
  periodSize: number,
  periodCount: number,
  assets: Asset[]
): Promise<void> => {
  const address = await getAddress();
  const capsuleContract = await getCapsuleContract();

  const ethAssets = assets.filter((a: Asset) => a.token === "ETH");
  const eth = ethAssets.length === 1 ? ethAssets[0].value : 0;
  const otherAssets = assets.filter((a: Asset) => a.token !== "ETH");

  const tx = {
    from: address,
    value: eth,
  };
  await capsuleContract.methods
    .createCapsule(
      beneficiary,
      dateToUnix(distributionDate),
      periodSize,
      periodCount,
      otherAssets.map((a: Asset) => a.token),
      otherAssets.map((a: Asset) => a.value)
    )
    .send(tx);
};

export const openCapsule = async (capsuleId: number): Promise<void> => {
  const capsuleContract = await getCapsuleContract();
  await capsuleContract.methods.openCapsule(new BN(capsuleId)).send();
};

// Views
export const getSentCapsules = async (): Promise<CapsuleType[]> => {
  const address = await getAddress();
  const capsuleContract = await getCapsuleContract();
  const response: ContractCapsuleType[] = await capsuleContract.methods
    .getSentCapsules(address)
    .call();
  const capsuleIds = response.map((r: ContractCapsuleType) => r.id);
  const usds: string[] = await getUsdValues(capsuleIds);
  return response.map((rc: ContractCapsuleType, index: number) =>
    responseToCapsule(rc, usds[index])
  );
};

export const getReceivedCapsules = async (): Promise<CapsuleType[]> => {
  const address = await getAddress();
  const capsuleContract = await getCapsuleContract();
  const response: ContractCapsuleType[] = await capsuleContract.methods
    .getReceivedCapsules(address)
    .call();
  const capsuleIds = response.map((r: ContractCapsuleType) => r.id);
  const usds: string[] = await getUsdValues(capsuleIds);
  return response.map((rc: ContractCapsuleType, index: number) =>
    responseToCapsule(rc, usds[index])
  );
};

export const getUsdValues = async (capsuleIds: string[]): Promise<string[]> => {
  const capsuleContract = await getCapsuleContract();
  return capsuleContract.methods.getUsdValues(capsuleIds).call();
};

// Utils
export const responseToCapsule = (
  capsule: ContractCapsuleType,
  usd: string
): CapsuleType => {
  const assets: Asset[] = [];
  const eth = toEthUnit(new BN(capsule.value));
  if (eth > 0) assets.push({ token: "ETH", value: capsule.value });
  for (let i = 0; i < capsule.tokens.length; i++) {
    assets.push({
      token: capsule.tokens[i],
      value: capsule.amounts[i],
    });
  }

  return {
    id: Number(capsule.id),
    beneficiary: capsule.beneficiary,
    grantor: capsule.grantor,
    opened: capsule.opened,
    createdDate: UnixToDate(Number.parseFloat(capsule.createdDate)),
    distributionDate: UnixToDate(Number.parseFloat(capsule.distributionDate)),
    periodType: getPeriodType(capsule.periodSize),
    periodCount: Number(capsule.periodCount),
    claimedPeriods: Number(capsule.claimedPeriods),
    assets,
    usd: toEthUnit(new BN(usd)).toString(),
  };
};

export const ethBalance = async (): Promise<number> => {
  const address = await getAddress();
  const wei = await window.web3.eth.getBalance(address);
  return toEthUnit(wei);
};

// Tokens
export const approveToken = async (token: string): Promise<void> => {
  const tokenContract = await getTokenContract(token);
  await tokenContract.methods
    .approve(GLOBALS.CAPSULE, new BN("9999999999999999999999999999"))
    .send();
};

export const tokenApproved = async (token: string): Promise<boolean> => {
  if (token === "ETH") return true;
  const address = await getAddress();
  const tokenContract = await getTokenContract(token);
  const allowance = await tokenContract.methods
    .allowance(address, GLOBALS.CAPSULE)
    .call();
  return new BN(allowance).gt(new BN("9999999999999999999999"));
};

export const tokenBalance = async (token: Token): Promise<number> => {
  const address = await getAddress();
  const tokenContract = await getTokenContract(token.address);
  const cents = await tokenContract.methods.balanceOf(address).call();
  return cents / 10 ** token.decimals;
};
