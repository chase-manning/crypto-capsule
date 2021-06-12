import { Contract } from "web3-eth-contract";
import Web3 from "web3";
import BN from "bn.js";
import capsuleAbi from "../contracts/CryptoCapsule.json";
import tokenAbi from "../contracts/ERC20.json";
import { toEthUnit } from "./web3Service";
import { dateToUnix, getPeriodType, UnixToDate } from "./dateHelper";
import CapsuleType, { Asset } from "../types/CapsuleType";
import ContractCapsuleType from "../types/ContractCapsuleType";
import Token from "../types/Token";
import { getGlobals } from "../utils/globals";

// Shared
export const isConnected = (): boolean => {
  return (window as any).web3.eth;
};

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
  const globals = await getGlobals();
  return new (window as any).web3.eth.Contract(capsuleAbi, globals.CAPSULE, {
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
  assets: Asset[],
  addingAssetsAllowed: boolean
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
      otherAssets.map((a: Asset) => a.value),
      addingAssetsAllowed
    )
    .send(tx);
};

export const openCapsule = async (capsuleId: number): Promise<void> => {
  const capsuleContract = await getCapsuleContract();
  await capsuleContract.methods.openCapsule(new BN(capsuleId)).send();
};

export const addAssets = async (
  capsuleId: number,
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
    .addAssets(
      capsuleId,
      otherAssets.map((a: Asset) => a.token),
      otherAssets.map((a: Asset) => a.value)
    )
    .send(tx);
};

export const updateBeneficiary = async (
  capsuleId: number,
  beneficiary: string
): Promise<void> => {
  const capsuleContract = await getCapsuleContract();
  await capsuleContract.methods
    .updateBeneficiary(capsuleId, beneficiary)
    .send();
};

// Views
export const getCapsule = async (
  capsuleId: number
): Promise<CapsuleType | null> => {
  if (!isConnected()) return null;
  const capsuleContract = await getCapsuleContract();
  const response: ContractCapsuleType = await capsuleContract.methods
    .getCapsule(capsuleId)
    .call();
  return responseToCapsule(response);
};

export const getSentCapsules = async (): Promise<CapsuleType[]> => {
  if (!isConnected()) return [];
  const address = await getAddress();
  const capsuleContract = await getCapsuleContract();
  const response: ContractCapsuleType[] = await capsuleContract.methods
    .getSentCapsules(address)
    .call();
  return response.map((rc: ContractCapsuleType) => responseToCapsule(rc));
};

export const getReceivedCapsules = async (): Promise<CapsuleType[]> => {
  if (!isConnected()) return [];
  const address = await getAddress();
  const capsuleContract = await getCapsuleContract();
  const response: ContractCapsuleType[] = await capsuleContract.methods
    .getReceivedCapsules(address)
    .call();
  return response.map((rc: ContractCapsuleType) => responseToCapsule(rc));
};

// Utils
export const responseToCapsule = (
  capsule: ContractCapsuleType
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
    empty: capsule.empty,
    createdDate: UnixToDate(Number.parseFloat(capsule.createdDate)),
    distributionDate: UnixToDate(Number.parseFloat(capsule.distributionDate)),
    periodType: getPeriodType(capsule.periodSize),
    periodCount: Number(capsule.periodCount),
    claimedPeriods: Number(capsule.claimedPeriods),
    assets,
    addingAssetsAllowed: capsule.addingAssetsAllowed,
  };
};

export const ethBalance = async (): Promise<number> => {
  const address = await getAddress();
  const wei = await window.web3.eth.getBalance(address);
  return toEthUnit(wei);
};

// Tokens
export const approveToken = async (token: string): Promise<void> => {
  const globals = await getGlobals();
  const tokenContract = await getTokenContract(token);
  await tokenContract.methods
    .approve(globals.CAPSULE, new BN("9999999999999999999999999999"))
    .send();
};

export const tokenApproved = async (token: string): Promise<boolean> => {
  if (token === "ETH") return true;
  const globals = await getGlobals();
  const address = await getAddress();
  const tokenContract = await getTokenContract(token);
  const allowance = await tokenContract.methods
    .allowance(address, globals.CAPSULE)
    .call();
  return new BN(allowance).gt(new BN("9999999999999999999999"));
};

export const tokenBalance = async (token: Token): Promise<number> => {
  const address = await getAddress();
  const tokenContract = await getTokenContract(token.address);
  const cents = await tokenContract.methods.balanceOf(address).call();
  return cents / 10 ** token.decimals;
};

export const getAssetSymbol = async (asset: Asset): Promise<string> => {
  if (asset.token.toLocaleLowerCase() === "eth") return "ETH";
  const tokenContract = await getTokenContract(asset.token);
  return tokenContract.methods.symbol().call();
};

export const getAssetDecimals = async (asset: Asset): Promise<number> => {
  if (asset.token.toLocaleLowerCase() === "eth") return 18;
  const tokenContract = await getTokenContract(asset.token);
  return tokenContract.methods.decimals().call();
};

export const getAssetRealValue = async (asset: Asset): Promise<number> => {
  if (asset.value === "0") return 0;
  const decimals = await getAssetDecimals(asset);
  return Number(asset.value) / 10 ** decimals;
};
