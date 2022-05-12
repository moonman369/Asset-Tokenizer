const LiquidToken = artifacts.require("liquidtoken.sol");
var LiquidTokenSale = artifacts.require("liquidtokensale.sol");
require("dotenv").config({ path: "../.env" });

var chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("Liquid Token Sale Test", async (accounts) => {
  const [creator, recipient, anotherAccount] = await accounts;

  it("should have 50% of the total supply left in the creator account", async () => {
    let instance = LiquidToken.deployed();
    return expect(
      instance.balanceOf(creator)
    ).to.eventually.be.a.bignumber.equal(new BN(process.env.INITIAL_TOKENS));
  });
});
