import { Contract } from "web3-eth-contract";
import abi from "../data/aggregatorV3InterfaceABI.json";
import CapsuleType, { Asset } from "../types/CapsuleType";
import { OracleType } from "../data/oracles";
import { getGlobals } from "../utils/globals";

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

export const getOracle = async (token: string): Promise<string> => {
  const globals = await getGlobals();
  const oracles = globals.ORACLES.filter((o: OracleType) => o.token === token);
  if (oracles.length === 0) return "";
  return oracles[0].oracle;
};

export const getTokenPriceInUsd = async (token: string): Promise<number> => {
  const oracle = await getOracle(token);
  const oracleContract = await getOracleContract(oracle);
  const roundData: RoundDataType = await oracleContract.methods
    .latestRoundData()
    .call();
  return roundData.answer / 10 ** 8;
};

export const getTokenValueInUsd = async (
  token: string,
  amount: number
): Promise<number> => {
  const price = await getTokenPriceInUsd(token);
  return amount * price;
};

export const getCapsuleUsdValue = async (
  capsule: CapsuleType
): Promise<number> => {
  const usds: number[] = [];
  const promises = capsule.assets.map(async (asset: Asset) =>
    usds.push(
      await getTokenValueInUsd(asset.token, Number(asset.value) / 10 ** 18)
    )
  );
  await Promise.all(promises);
  return usds.reduce((a: number, b: number) => a + b, 0);
};
