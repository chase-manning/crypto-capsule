import { Contract } from "web3-eth-contract";
import Web3 from "web3";
import GLOBALS from "../utils/globals";
import capsuleAbi from "../contracts/CryptoCapsule.json";
import { toWeiUnit } from "./web3Service";
import CapsuleType from "../types/CapsuleType";

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
    .createCapsule(beneficiary, distributionDate.getTime(), tokens, values)
    .send(tx);
};

// Views
export const getSentCapsules = async (): Promise<CapsuleType[]> => {
  const address = await getAddress();
  const capsuleContract = await getCapsuleContract();
  return await capsuleContract.methods.getSentCapsules(address).call();
};

export const getReceivedCapsules = async (): Promise<CapsuleType[]> => {
  const address = await getAddress();
  const capsuleContract = await getCapsuleContract();
  return await capsuleContract.methods.getReceivedCapsules(address).call();
};
