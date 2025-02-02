const { expect } = require("chai");
const { ethers } = require("hardhat");
require("@nomicfoundation/hardhat-chai-matchers");

describe("Lock contract", function () {
  let lockInstance;
  let owner, otherAccount;
  let unlockTime;

  beforeEach(async function () {
    [owner, otherAccount] = await ethers.getSigners();

    const Lock = await ethers.getContractFactory("Lock");
    const latestBlock = await ethers.provider.getBlock("latest");
    unlockTime = latestBlock.timestamp + 60;
    lockInstance = await Lock.deploy(unlockTime, { value: ethers.utils.parseEther("1") });
    await lockInstance.deployed();
  });

  it("Should set the right unlockTime", async function () {
    expect(await lockInstance.unlockTime()).to.equal(ethers.BigNumber.from(unlockTime));
  });

  it("Should receive and store the funds to lock", async function () {
    expect(await ethers.provider.getBalance(lockInstance.address)).to.equal(ethers.utils.parseEther('1'));
  });

  it("Should fail if unlockTime is not in the future", async function () {
    const Lock = await ethers.getContractFactory("Lock");
    const pastUnlockTime = Math.floor(Date.now() / 1000) - 3600;
    await expect(Lock.deploy(pastUnlockTime, { value: ethers.utils.parseEther("1") }))
      .to.be.revertedWith("Unlock time should be in the future");
  });

  it("Should revert with the right error if called too soon", async function () {
    await expect(lockInstance.withdraw()).to.be.revertedWith("You can't withdraw yet");
  });

  it("Should revert with the right error if called from another account", async function () {
    await expect(lockInstance.connect(otherAccount).withdraw()).to.be.revertedWith("You aren't the owner");
  });

  it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
    await ethers.provider.send("evm_increaseTime", [3600]); 
    await ethers.provider.send("evm_mine"); 

    await expect(lockInstance.withdraw()).to.not.be.reverted;
  });

  it("Should emit an event on withdrawals", async function () {
    await ethers.provider.send("evm_increaseTime", [3600]); 
    await ethers.provider.send("evm_mine");

    await expect(lockInstance.withdraw())
      .to.emit(lockInstance, "Withdrawal")
      .withArgs(owner.address, ethers.utils.parseEther("1"), unlockTime);
  });
});
