export const TEST_MODE = true;

type GlobalsType = {
  CAPSULE: string;
  NETWORK: string;
};

const GLOBALS: GlobalsType = {
  CAPSULE: "0x9F37d5DE3F48E8af0DEB8023e940fE952FfffE5B",
  NETWORK: TEST_MODE ? "rinkeby" : "mainnet",
};

export default GLOBALS;
