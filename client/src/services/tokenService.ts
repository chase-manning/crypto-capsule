import rinkebyTokens from "../data/rinkebyTokens";
import Token from "../types/Token";
import { getGlobals } from "../utils/globals";

export const getTokens = async (): Promise<Token[]> => {
  const globals = await getGlobals();
  let tokens: Token[] = [];

  if (globals.TOKENS.length > 0) {
    tokens = [...rinkebyTokens];
  } else {
    const response = await fetch(globals.TOKENS_URL);
    const data = await response.json();
    tokens = data.tokens;
  }
  tokens.push(ethToken);
  tokens.reverse();
  return tokens;
};

export const ethToken: Token = {
  address: "ETH",
  name: "Ether",
  symbol: "ETH",
  decimals: 18,
  logoURI:
    "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880",
};
