export const TEST_MODE = true;

type GlobalsType = {
  CAPSULE: string;
  NETWORK: string;
};

const GLOBALS: GlobalsType = {
  CAPSULE: "0x14430C6E97d76029B1de0926303F88d90669Ac40",
  NETWORK: TEST_MODE ? "rinkeby" : "mainnet",
};

export default GLOBALS;
