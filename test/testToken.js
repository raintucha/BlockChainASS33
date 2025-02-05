const { expect } = require("chai");
const { ethers } = require("hardhat");
require("@nomicfoundation/hardhat-chai-matchers");


describe("AITUSE2316 ERC-20 Token", function () {
    let AITUSE2316;
    let aituse2316;
    let owner, otherAccount;
    let initialSupply = ethers.parseUnits("2000", 18);

    beforeEach(async function () {
        [owner, otherAccount] = await ethers.getSigners();
        const AITUSE2316Factory = await ethers.getContractFactory("AITUSE2316");
        aituse2316 = await AITUSE2316Factory.deploy(initialSupply);
        
    });

    it("Should create tokens with an initial amount of 2000", async function () {
        const ownerBalance = await aituse2316.balanceOf(owner.address);
        expect(ownerBalance).to.equal(initialSupply);
    });

    it("Should allow transfer of tokens", async function () {
        await aituse2316.transfer(otherAccount.address, ethers.parseUnits("500", 18));
        const receiverBalance = await aituse2316.balanceOf(otherAccount.address);
        expect(receiverBalance).to.equal(ethers.parseUnits("500", 18));
    });

    it("Should allow approval and transferFrom", async function () {
        await aituse2316.approve(otherAccount.address, ethers.parseUnits("500", 18));
        expect(await aituse2316.allowance(owner.address, otherAccount.address))
            .to.equal(ethers.parseUnits("500", 18));

        await aituse2316.connect(otherAccount).transferFrom(owner.address, otherAccount.address, ethers.parseUnits("500", 18));

        expect(await aituse2316.balanceOf(otherAccount.address)).to.equal(ethers.parseUnits("500", 18));
    });

    it("Should return the timestamp of the latest transaction", async function () {
        const tx = await aituse2316.transfer(otherAccount.address, ethers.parseUnits("100", 18));
        const receipt = await tx.wait();
        const timestamp = await aituse2316.getLatestTransactionTimestamp(otherAccount.address);
        expect(timestamp).to.be.above(0);
    });

    it("Should revert transfer if sender has insufficient balance", async function () {
        await expect(
            aituse2316.connect(otherAccount).transfer(owner.address, ethers.parseUnits("500", 18))
          ).to.be.reverted;
          
          
    });
});
