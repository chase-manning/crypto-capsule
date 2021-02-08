const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545,
    },
  },
  compilers: {
    solc: {
      version: ">=0.6.0 <=0.7.4",
    },
  },
};
