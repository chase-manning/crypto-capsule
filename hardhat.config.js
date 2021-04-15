require("@nomiclabs/hardhat-waffle");
var secrets = require("./secrets");

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkenby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/" + secrets.alchemyKey,
      accounts: [secrets.walletPrivateKey],
    },
  },
};
