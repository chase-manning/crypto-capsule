export const TEST_MODE = true;

type GlobalsType = {
  CAPSULE: string;
  NETWORK: string;
};

const GLOBALS: GlobalsType = {
  CAPSULE: "0x653C428093EDa1BE5d634e3F229585856002B4d4",
  NETWORK: TEST_MODE ? "rinkeby" : "mainnet",
};

export default GLOBALS;
