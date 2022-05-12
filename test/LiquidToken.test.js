const LiquidToken = artifacts.require("liquidtoken.sol");

var chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("LiquidToken", async (accounts) => {
  const [creator, recipient, anotherAccount] = await accounts;

  it("mint initial supply in creator's account", async () => {
    let instance = await LiquidToken.deployed();
    let totalSupply = await instance.totalSupply();
    //let balance = await instance.balanceOf (creatorAddress);
    // assert.equal (balance.valueOf(), totalSupply.valueOf(), "Balance was not the same")

    //using chai
    // expect(await instance.balanceOf(creatorAddress)).to.be.a.bignumber.equal(
    //   totalSupply);

    //Using chai-as-promised: no await reqd.
    expect(instance.balanceOf(creator)).to.eventually.be.a.bignumber.equal(
      totalSupply
    );
  });

  it("is not possible to send an amount greater than the total supply", async () => {
    let instance = await LiquidToken.deployed();
    let totalSupply = await instance.totalSupply();
    let creatorBalance = await instance.balanceOf(creator);
    let sendAmount = Number(creatorBalance) + 1;

    expect(instance.transfer(recipient, sendAmount)).to.eventually.be.rejected;
    expect(instance.balanceOf(creator)).to.eventually.be.a.bignumber.equal(
      totalSupply
    );
  });

  it("is possible to send tokens between accounts", async () => {
    let instance = await LiquidToken.deployed();
    const sendAmount = 1;
    let totalSupply = await instance.totalSupply();
    expect(instance.balanceOf(creator)).to.eventually.be.a.bignumber.equal(
      totalSupply
    );
    expect(instance.transfer(recipient, new BN(sendAmount))).to.eventually.be
      .fulfilled;
    expect(instance.balanceOf(creator)).to.eventually.be.a.bignumber.equal(
      totalSupply - new BN(sendAmount)
    );
    expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(
      new BN(sendAmount)
    );
  });
});