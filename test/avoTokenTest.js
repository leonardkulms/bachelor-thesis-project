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

  it("should show that not_owner only exists when created", async () => {
    let doesExist = await instance.exists(notOwner1);
    assert.equal(
      doesExist,
      false
    );
    instance.requestAllowance(notOwner1)
      .then(doesExist = await instance.exists(notOwner1));
    assert.equal(
    doesExist,
    true
    );
  });

  it("should show that the owner can create an allowance", async () => {
    await instance.incAllowance(notOwner1, 20);
    let countAllowances = await instance.getAllowancesCount();
    assert.equal(
      countAllowances,
      1
      );
    assert.equal(
      await instance.getAllowanceAmount(notOwner1),
      20
    );
  });

  it("should show that you cannot buy without an allowance", async () => {
    try {
      await instance.buyToken(10, { value: transferAmount, from: notOwner1 });
      } catch (error) {
      assert.throws(() => { throw new Error(error) }, Error, "Error: Returned error: VM Exception while processing transaction: revert Incorrect amount of Eth. -- Reason given: Incorrect amount of Eth..");
      }
  });

  it("should show that you can buy with an allowance", async () => {
    // as long as this does not throw it works
    await instance.incAllowance(notOwner2, 20);
    await instance.buyToken(10, { value: transferAmount, from: notOwner2 });
  });

  it("should show that decreasing allowance also works", async () => {
    await instance.incAllowance(notOwner4, 5);
    await instance.decAllowance(notOwner4, 2);
    assert.equal(
      await instance.getAllowanceAmount(notOwner4),
      3
    );
  });
  it("should show that you cannot buy more than allowance", async () => {
    await instance.incAllowance(notOwner3, 5);
    try {
      await instance.buyToken(10, { value: transferAmount, from: notOwner3 });
      } catch (error) {
      assert.throws(() => { throw new Error(error) }, Error, "Error: Returned error: VM Exception while processing transaction: revert ERC20: transfer amount exceeds allowance -- Reason given: ERC20: transfer amount exceeds allowance.");
      }     
  }
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
