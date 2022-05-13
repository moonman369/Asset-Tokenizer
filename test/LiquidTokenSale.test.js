const LiquidToken = artifacts.require("liquidtoken.sol");
var LiquidTokenSale = artifacts.require("liquidtokensale.sol");
require("dotenv").config({ path: "../.env" });

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("Liquid Token Sale Test", async (accounts) => {
  const [creator, recipient, anotherAccount] = accounts;

  afterEach(async (done) => {
    done();
  });

  it("should have 50% of the total supply left in the creator account", async () => {
    let instance = await LiquidToken.deployed();
    let instance2 = await LiquidTokenSale.deployed();

    return expect(
      instance.balanceOf.call(creator)
    ).to.eventually.be.a.bignumber.equal(new BN(0));
  });
});
