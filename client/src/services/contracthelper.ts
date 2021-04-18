import { Contract } from "web3-eth-contract";
import Web3 from "web3";
import GLOBALS from "../utils/globals";
import capsuleAbi from "../contracts/CryptoCapsule.json";
import { dateToUnix, toWeiUnit, UnixToDate } from "./web3Service";
import CapsuleType from "../types/CapsuleType";
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

// Functions
export const createCapsule = async (
  beneficiary: string,
  distributionDate: Date,
  value: string,
  tokens: string[],
  values: string[]
): Promise<void> => {
  const address = await getAddress();
  const capsuleContract = await getCapsuleContract();

  var tx = {
    from: address,
    value: toWeiUnit(value),
  };
  await capsuleContract.methods
    .createCapsule(beneficiary, dateToUnix(distributionDate), tokens, values)
    .send(tx);
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
  return {
    beneficiary: capsule.beneficiary,
    grantor: capsule.grantor,
    opened: capsule.opened,
    createdDate: UnixToDate(Number.parseFloat(capsule.createdDate)),
    distributionDate: UnixToDate(Number.parseFloat(capsule.distributionDate)),
    assets: [],
  };
};
