const LiquidToken = artifacts.require("liquidtoken.sol");
const LiquidTokenSale = artifacts.require("liquidtokensale.sol");
const LiquidTokenKYC = artifacts.require("liquidtokenkyc.sol");

require("dotenv").config({ path: "../.env" });

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("Liquid Token Sale Test", async (accounts) => {
  const [creator, recipient, anotherAccount] = accounts;

  it("should have 0 LQD tokens left in the creator account", async () => {
    let instance = await LiquidToken.deployed();
    let instance2 = await LiquidTokenSale.deployed();

    return expect(
      instance.balanceOf.call(creator)
    ).to.eventually.be.a.bignumber.equal(new BN(0));
  });

  it("should have the entire initial supply of LQD tokens in the LiquidTokenSale contract", async () => {
    let instance = await LiquidToken.deployed();
    let totalSupply = await instance.totalSupply();

    return expect(
      instance.balanceOf.call(LiquidTokenSale.address)
    ).to.eventually.be.a.bignumber.equal(new BN(totalSupply));
  });

  it("should be possible to buy tokens from the LiquidTokenSale contract", async () => {
    let instance1 = await LiquidToken.deployed();
    let instance2 = await LiquidTokenSale.deployed();
    let instance3 = await LiquidTokenKYC.deployed();

    let initialBalance = await instance1.balanceOf(recipient);

    await expect(instance3.approveKYC(recipient, { from: creator })).to
      .eventually.be.fulfilled;

    await expect(
      instance2.sendTransaction({
        from: recipient,
        value: web3.utils.toWei("1", "wei"),
      })
    ).to.eventually.be.fulfilled;

    return expect(
      instance1.balanceOf(recipient)
    ).to.eventually.be.a.bignumber.equal(initialBalance.add(new BN(1)));
  });
});
