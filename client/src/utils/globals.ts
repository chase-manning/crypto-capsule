export const TEST_MODE = true;

type GlobalsType = {
  CAPSULE: string;
  NETWORK: string;
};

const GLOBALS: GlobalsType = {
  CAPSULE: "0x4ECc114aeCbdB1005281991f1062DB42D000fD03",
  NETWORK: TEST_MODE ? "rinkeby" : "mainnet",
};

export default GLOBALS;
