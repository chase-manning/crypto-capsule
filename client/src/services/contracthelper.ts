import { Contract } from "web3-eth-contract";
import Web3 from "web3";
import BN from "bn.js";
import GLOBALS from "../utils/globals";
import capsuleAbi from "../contracts/CryptoCapsule.json";
import tokenAbi from "../contracts/IERC20.json";
import { dateToUnix, toEthUnit, toWeiUnit, UnixToDate } from "./web3Service";
import CapsuleType, { Asset } from "../types/CapsuleType";
import ContractCapsuleType from "../types/ContractCapsuleType";

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
  assets: Asset[]
): Promise<void> => {
  const address = await getAddress();
  const capsuleContract = await getCapsuleContract();

  const ethAssets = assets.filter((a: Asset) => a.token === "ETH");
  const eth = ethAssets.length === 1 ? ethAssets[0].value : 0;
  const otherAssets = assets.filter((a: Asset) => a.token !== "ETH");

  var tx = {
    from: address,
    value: toWeiUnit(eth.toString()),
  };
  await capsuleContract.methods
    .createCapsule(
      beneficiary,
      dateToUnix(distributionDate),
      otherAssets.map((a: Asset) => a.token),
      otherAssets.map((a: Asset) => a.value)
    )
    .send(tx);
};

export const openCapsule = async (capsuleId: number) => {
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
  return response.map((rc: ContractCapsuleType) => responseToCapsule(rc));
};

export const getReceivedCapsules = async (): Promise<CapsuleType[]> => {
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
  if (eth > 0) assets.push({ token: "ETH", value: eth });
  for (let i = 0; i < capsule.tokens.length; i++) {
    assets.push({
      token: capsule.tokens[i],
      value: Number.parseFloat(capsule.values[i]),
    });
  }

  return {
    id: Number.parseInt(capsule.id),
    beneficiary: capsule.beneficiary,
    grantor: capsule.grantor,
    opened: capsule.opened,
    createdDate: UnixToDate(Number.parseFloat(capsule.createdDate)),
    distributionDate: UnixToDate(Number.parseFloat(capsule.distributionDate)),
    assets: assets,
  };
};

// Tokens
export const approveToken = async (token: string): Promise<void> => {
  const tokenContract = await getTokenContract(token);
  await tokenContract.methods
    .approve(GLOBALS.CAPSULE, new BN("9999999999999999999999999999"))
    .send();
};

export const tokenAllowance = async (token: string): Promise<number> => {
  const address = await getAddress();
  const tokenContract = await getTokenContract(token);
  return await tokenContract.methods.allowance(address, GLOBALS.CAPSULE).call();
};
