import { Contract } from "web3-eth-contract";
import abi from "../data/aggregatorV3InterfaceABI.json";
import CapsuleType, { Asset } from "../types/CapsuleType";
import ORACLES, { OracleType } from "../data/oracles";

type RoundDataType = {
  roundId: number;
  answer: number;
  startedAt: number;
  updatedAt: number;
  answeredInRound: number;
};

export const getOracleContract = async (oracle: string): Promise<Contract> => {
  return new (window as any).web3.eth.Contract(abi, oracle);
};

export const getOracle = (token: string): string => {
  console.log("Getting oracle");
  const oracles = ORACLES.filter((o: OracleType) => o.token === token);
  console.log(oracles);
  if (oracles.length === 0) return "";
  return oracles[0].oracle;
};

export const getTokenPriceInUsd = async (token: string): Promise<number> => {
  console.log("Getting token price in usd");
  const oracle = getOracle(token);
  console.log(oracle);
  console.log("Before error");
  const oracleContract = await getOracleContract(oracle);
  console.log("Got conract");
  const roundData: RoundDataType = await oracleContract.methods
    .latestRoundData()
    .call();
  console.log(roundData);
  return roundData.answer / 10 ** 8;
};

export const getTokenValueInUsd = async (
  token: string,
  amount: number
): Promise<number> => {
  console.log("Token Value in usd");
  const price = await getTokenPriceInUsd(token);
  console.log(price);
  console.log(amount);
  console.log(price * amount);
  return amount * price;
};

export const getCapsuleUsdValue = async (
  capsule: CapsuleType
): Promise<number> => {
  console.log("getting capsule usd value");
  let usd = 0;
  const promises = capsule.assets.map(
    async (asset: Asset) =>
      (usd += await getTokenValueInUsd(
        asset.token,
        Number(asset.value) / 10 ** 18
      ))
  );
  await Promise.all(promises);
  return usd;
};
