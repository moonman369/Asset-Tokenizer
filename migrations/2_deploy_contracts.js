var LiquidToken = artifacts.require("liquidtoken.sol");
var LiquidTokenSale = artifacts.require("liquidtokensale.sol");
require("dotenv").config({ path: "../.env" });
console.log(process.env);

const BN = web3.utils.BN;
const totalSupply = process.env.INITIAL_TOKENS;
module.exports = async (deployer) => {
  let address = await web3.eth.getAccounts();
  await deployer.deploy(LiquidToken, totalSupply);
  await deployer.deploy(LiquidTokenSale, 1, address[0], LiquidToken.address);
  let instance = await LiquidToken.deployed();
  await instance.transfer(LiquidTokenSale.address, new BN(totalSupply / 2));
};
