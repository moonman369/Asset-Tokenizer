const LiquidToken = artifacts.require("liquidtoken.sol");
var LiquidTokenSale = artifacts.require("liquidtokensale.sol");
require("dotenv").config({ path: "../.env" });

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("Liquid Token Sale Test", async (accounts) => {
  const [creator, recipient, anotherAccount] = await accounts;

  it("should have 50% of the total supply left in the creator account", async () => {
    let instance = await LiquidToken.deployed();

    expect(instance.balanceOf(creator)).to.eventually.be.a.bignumber.equal(
      new BN(process.env.INITIAL_TOKENS / 2)
    );
  });
});
