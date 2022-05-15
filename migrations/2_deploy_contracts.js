var LiquidToken = artifacts.require("liquidtoken.sol");
var LiquidTokenSale = artifacts.require("liquidtokensale.sol");
var LiquidTokenKYC = artifacts.require("liquidtokenkyc.sol");

require("dotenv").config({ path: "../.env" });

const BN = web3.utils.BN;
let totalSupply = process.env.INITIAL_TOKENS;
module.exports = async (deployer) => {
  let address = await web3.eth.getAccounts();
  await deployer.deploy(LiquidToken, totalSupply);

  await deployer.deploy(LiquidTokenKYC);

  await deployer.deploy(
    LiquidTokenSale,
    1,
    address[0],
    LiquidToken.address,
    LiquidTokenKYC.address
  );

  let instance = await LiquidToken.deployed();
  totalSupply *= 10 ** (await instance.decimals());
  await instance.transfer(LiquidTokenSale.address, new BN(totalSupply));
};
