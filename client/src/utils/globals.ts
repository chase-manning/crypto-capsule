export const TEST_MODE = true;

type GlobalsType = {
  CAPSULE: string;
  NETWORK: string;
};

const GLOBALS: GlobalsType = {
  CAPSULE: "0x6B6b712E67f69AA88121774063d4E7ca35971868",
  NETWORK: TEST_MODE ? "rinkeby" : "mainnet",
};

export default GLOBALS;
