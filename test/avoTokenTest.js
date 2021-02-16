const ethers = require('ethers');
const AvoToken = artifacts.require("AvoToken");

contract("AvoToken", accounts => {
  let owner = accounts[0];
  let notOwner1 = accounts[1];
  let notOwner2 = accounts[2];
  let notOwner3 = accounts[3];
  let notOwner4 = accounts[4];
  let amount = 1000;
  let transferAmount;

  beforeEach(async function () {
    transferAmount = await ethers.utils.parseEther("10");
    instance = await AvoToken.deployed(amount);
  });

  it("shows that the account was deployed by accounts[0] (owner)", async () => {
    let verifiedOwner = await instance.verifyOwner();
    assert.equal(
    true,
    verifiedOwner,
    "Owner Account is not the one it should be"
    );
  });

  it("shows that verifyOwner only lets owner through", async () => {
    try {
    await instance.verifyOwner({ from: notOwner1 });
    } catch (error) {
    assert.throws(() => { throw new Error(error) }, Error, "Ownable: caller is not the _owner");
    }
  });

  it("should check owner's balance", async () => {
    let balance = await instance.balanceOf(owner);
    assert.equal(
      balance.valueOf(),
      1000,
      "The owner's balance is not right"
    );
  });

  it("should check not_owners balance balance", async () => {
    let balance = await instance.balanceOf(notOwner1);
    assert.equal(
      balance.valueOf(),
      0,
      "Second Account Coin balance is non-zero"
    );
  });
  
  it("should mint 1000 Coins to second account", async () => {
  await instance.mint(accounts[1], amount, { from: owner });
  let balance = await instance.balances(accounts[1]);
  assert.equal(
  balance.valueOf(),
  amount,
  "Second Account’s Coin balance is not equal to the minting amount"
  );
  });
  
  it("should throw if mint is called not from minter account", async () => {
  try {
  await instance.mint(accounts[2], amount, { from: accounts[1] });
  } catch (error) {
  assert.throws(() => { throw new Error(error) }, Error, "Unauthorized Access");
  }
  });
  
  it("should transfer 500 Coins from third account to second account", async () => {
  try {
  await instance.send(accounts[1], transferAmount, { from: accounts[2] });
  } catch (error) {
  assert.throws(() => { throw new Error(error) }, Error, "Insufficient balance");
  }
  });
  
  it("should transfer 500 Coins from second account to third account", async () => {
  await instance.mint(accounts[1], amount, { from: owner });
  await instance.send(accounts[2], transferAmount, { from: accounts[1] });
  let secondAccBalance = await instance.balances(accounts[1]);
  let thirdAccBalance = await instance.balances(accounts[2]);
  assert.equal(
  secondAccBalance.valueOf(),
  amount – transferAmount,
  "Second Account’s Coin balance is not equal to transfer amount"
  );
  assert.equal(
  thirdAccBalance.valueOf(),
  transferAmount,
  "Third Account’s Coin balance is not equal to transfer amount"
  );
  });
  });
