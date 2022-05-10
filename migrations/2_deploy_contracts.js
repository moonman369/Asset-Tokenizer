var LiquidToken = artifacts.require("liquidtoken.sol");

module.exports = async (deployer) => {
  await deployer.deploy(LiquidToken, 10000000);
};
