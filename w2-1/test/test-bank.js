const { expect } = require("chai");
const { ethers } = require("hardhat");

let bank, owner, addr1, addr2;
beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const Bank = await ethers.getContractFactory("Bank");
    bank = await Bank.deploy();
});

describe("Bank", function () {
    it("recharge", async function () {
        await owner.sendTransaction({to: bank.address, value: ethers.utils.parseEther('10')})
        let user = await bank.getUser(owner.address);
        expect(ethers.utils.formatEther(user[0].amount.toString())).to.equal("10.0");
        expect(ethers.utils.formatEther(await bank.provider.getBalance(bank.address))).to.equal("10.0");
    });
    it("withdraw", async function () {
        await owner.sendTransaction({to: bank.address, value: ethers.utils.parseEther('10')})
        await bank.withdraw();
        expect(ethers.utils.formatEther(await bank.provider.getBalance(bank.address))).to.equal("0.0");
    });
});