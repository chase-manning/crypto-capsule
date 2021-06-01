import { Contract } from "web3-eth-contract";
import abi from "../data/aggregatorV3InterfaceABI.json";
import CapsuleType, { Asset } from "../types/CapsuleType";
import { getAddress } from "./contracthelper";
import ORACLES, { OracleType } from "../data/oracles";

type RoundDataType = {
  roundID: number;
  price: number;
  startedAt: number;
  timeStamp: number;
  answeredInRound: number;
};

export const getOracleContract = async (oracle: string): Promise<Contract> => {
  return new (window as any).web3.eth.Contract(abi, oracle, {
    from: await getAddress(),
  });
};

export const getOracle = (token: string): string => {
  const oracles = ORACLES.filter((o: OracleType) => o.token === token);
  if (oracles.length === 0) return "";
  return oracles[0].oracle;
};

export const getTokenPriceInUsd = async (token: string): Promise<number> => {
  const oracle = getOracle(token);
  const oracleContract = await getOracleContract(oracle);
  const roundData: RoundDataType = await oracleContract.methods
    .latestRoundData()
    .call();
  return roundData.price / 8;
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
  return capsule.assets
    .map((asset: Asset) =>
      getTokenValueInUsd(asset.token, Number(asset.value) / 18)
    )
    .reduce((a: number, b: any) => b + a, 0);
};
