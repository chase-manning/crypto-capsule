import Token from "../types/Token";

const rinkebyTokens: Token[] = [
  {
    name: "Wrapped Ether",
    address: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
    symbol: "WETH",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880",
  },
  {
    name: "Dai Stablecoin",
    address: "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735",
    symbol: "DAI",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/9956/thumb/dai-multi-collateral-mcd.png?1574218774",
  },
  {
    name: "Maker",
    address: "0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85",
    symbol: "MKR",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/1364/thumb/Mark_Maker.png?1585191826",
  },
  {
    name: "Uniswap",
    address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    symbol: "UNI",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/12504/thumb/uniswap-uni.png?1600306604",
  },
];

export default rinkebyTokens;
