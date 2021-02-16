const AvoToken = artifacts.require("AvoToken");

contract("AvoToken", accounts => {

  let owner = accounts[0];
  let instance;
  let amount = 1000;
  let transferAmount = 500;

  beforeEach(async function () {
    instance = await AvoToken.new({ from: owner });
  });
})

it("should check owner account as minter", async () => {
  let minter = await instance.minter();
  assert.equal(
  minter,
  owner,
  "Owner Account is not the minter"
  );
  });
  
  it("should check minter’s balance", async () => {
  let balance = await instance.balances(owner);
  assert.equal(
  balance.valueOf(),
  0,
  "Minter’s Coin balance is non-zero"
  );
  });
  
  it("should check second account balance", async () => {
  let balance = await instance.balances(accounts[1]);
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
