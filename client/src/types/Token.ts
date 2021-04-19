type Token = {
  name: string;
  address: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  balance?: number;
};

export default Token;
