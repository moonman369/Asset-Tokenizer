var LiquidToken = artifacts.require("liquidtoken.sol");
var LiquidTokenSale = artifacts.require("liquidtokensale.sol");

module.exports = async (deployer) => {
  let address = await web3.eth.getAccounts();
  await deployer.deploy(LiquidToken, 1000000);
  await deployer.deploy(LiquidTokenSale, 1, address[0], LiquidToken.address);
};
