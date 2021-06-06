import { ethOracles, OracleType, rinkebyOracles } from "../data/oracles";
import rinkebyTokens from "../data/rinkebyTokens";
import { getNetwork } from "../services/web3Service";
import Token from "../types/Token";

export const TEST_MODE = true;

type GlobalsType = {
  CAPSULE: string;
  TOKENS: Token[];
  TOKENS_URL: string;
  ORACLES: OracleType[];
};

const RINKEBY_GLOBALS: GlobalsType = {
  CAPSULE: "0x653C428093EDa1BE5d634e3F229585856002B4d4",
  TOKENS: rinkebyTokens,
  TOKENS_URL: "",
  ORACLES: rinkebyOracles,
};

const ETH_GLOBALS: GlobalsType = {
  CAPSULE: "0x653C428093EDa1BE5d634e3F229585856002B4d4",
  TOKENS: [],
  TOKENS_URL: "https://tokens.coingecko.com/uniswap/all.json",
  ORACLES: ethOracles,
};

export const getGlobals = async (): Promise<GlobalsType> => {
  const networkId = await getNetwork();
  if (networkId === 4) return RINKEBY_GLOBALS;
  // if (networkId === 56) return BSC_GLOBALS;
  return ETH_GLOBALS;
};
