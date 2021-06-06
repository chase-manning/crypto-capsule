export type OracleType = {
  token: string;
  oracle: string;
};

export const rinkebyOracles: OracleType[] = [
  {
    token: "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735",
    oracle: "0x2bA49Aaa16E6afD2a993473cfB70Fa8559B523cF",
  },
  {
    token: "ETH",
    oracle: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
  },
];

export const ethOracles: OracleType[] = [];

// https://docs.chain.link/docs/ethereum-addresses/
