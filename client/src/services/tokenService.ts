import rinkebyTokens from "../data/rinkebyTokens";
import Token from "../types/Token";
import { TEST_MODE } from "../utils/globals";

export const getTokens = async (): Promise<Token[]> => {
  if (TEST_MODE) return rinkebyTokens;
  const response = await fetch("https://tokens.coingecko.com/uniswap/all.json");
  const data = await response.json();
  const tokens: Token[] = data.tokens;
  return tokens;
};
