import Web3 from "web3";
import BN from "bn.js";
import Token from "../types/Token";

declare global {
  interface Window {
    web3: any;
  }
}

export const initWeb3 = (): void => {
  if (!window.web3) return;
  window.web3 = new Web3(window.web3.currentProvider);
};

export const toEthUnit = (wei: BN): number => {
  if (!window.web3) return 0;
  return Number.parseFloat(Web3.utils.fromWei(wei));
};

export const toWeiUnit = (eth: string): string => {
  if (!window.web3) return "";
  return Web3.utils.toWei(eth);
};

export const getNetwork = async (): Promise<number> => {
  if (!window.web3) return 1;
  return window.web3.eth.net.getId();
};

export const toCents = (dollars: number, token: Token): string => {
  if (token.address === "ETH") return toWeiUnit(dollars.toString());
  const decimals = Web3.utils.toBN(token.decimals);
  return (
    Web3.utils
      .toBN(dollars)
      /* eslint-disable no-restricted-properties */
      .mul(Web3.utils.toBN(10).pow(decimals))
      .toString()
  );
};

export const toDollars = (cents: number, token: Token): number => {
  if (token.address === "ETH") return cents;
  return cents / Math.pow(10, token.decimals);
};
