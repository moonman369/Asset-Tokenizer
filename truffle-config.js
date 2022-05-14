const path = require("path");
require("dotenv").config({ path: "./.env" });
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = process.env.TRUFFLE_HDWALLET_MNEMONIC;
const accountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    ganache_local: {
      provider: function () {
        return new HDWalletProvider(
          mnemonic,
          "http://127.0.0:7545",
          accountIndex
        );
        network_id: "*";
      },
    },
  },
  compilers: {
    solc: {
      version: "^0.8.13",
    },
  },
};
