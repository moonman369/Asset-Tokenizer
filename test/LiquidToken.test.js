const LiquidToken = artifacts.require("liquidtoken.sol");
require("dotenv").config({ path: "../.env" });

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("Liquid Token Test", async (accounts) => {
  const [creator, recipient, anotherAccount] = accounts;

  beforeEach(async () => {
    this.LQD = await LiquidToken.new(process.env.INITIAL_TOKENS);
  });

  afterEach(async (done) => {
    done();
  });

  it("mint initial supply in creator's account", async () => {
    let instance = this.LQD;
    let totalSupply = await instance.totalSupply();
    //let balance = await instance.balanceOf (creatorAddress);
    // assert.equal (balance.valueOf(), totalSupply.valueOf(), "Balance was not the same")

    //using chai
    // expect(await instance.balanceOf(creatorAddress)).to.be.a.bignumber.equal(
    //   totalSupply);

    //Using chai-as-promised: no await reqd.
    return expect(
      instance.balanceOf(creator)
    ).to.eventually.be.a.bignumber.equal(totalSupply);
  });

  // it("should send 50% of the total supply to the crowdsale contract", async () => {
  //   let instance1 = this.LQD;
  //   let totalSupply = instance1.totalSupply();

  //   expect(
  //     instance1.balanceOf(LiquidTokenSale.address)
  //   ).to.eventually.be.a.bignumber.equal(new BN(totalSupply / 2));

  //   expect(instance1.balanceOf(creator)).to.eventually.be.a.bignumber.equal(
  //     new BN(totalSupply / 2)
  //   );
  // });

  it("is not possible to send an amount greater than the total supply", async () => {
    let instance = this.LQD;
    let totalSupply = await instance.balanceOf(creator);
    let sendAmount = 1000001;

    expect(instance.transfer(recipient, new BN(sendAmount))).to.eventually.be
      .rejected;
    return expect(
      instance.balanceOf(creator)
    ).to.eventually.be.a.bignumber.equal(new BN(totalSupply));
  });

  it("is possible to send tokens between accounts", async () => {
    const sendTokens = 1;
    let instance = this.LQD;
    let totalSupply = await instance.totalSupply();
    await expect(
      instance.balanceOf(creator)
    ).to.eventually.be.a.bignumber.equal(totalSupply);
    await expect(instance.transfer(recipient, sendTokens)).to.eventually.be
      .fulfilled;
    await expect(
      instance.balanceOf(creator)
    ).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
    await expect(
      instance.balanceOf(recipient)
    ).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
  });
});
