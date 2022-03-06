const { expect } = require("chai");
const { ethers } = require("hardhat");

let score, teacher, owner, addr1, addr2;
let ownerAddr, Addr1, Addr2;
beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const Score = await ethers.getContractFactory("Score");
    score = await Score.deploy();
    // await score.deployed();
    const Teacher = await ethers.getContractFactory("Teacher");
    teacher = await Teacher.deploy(score.address);
    // await teacher.deployed();
});

describe("Teacher", function () {
    it("addTeacher", async function () {
        await score.addTeacher(addr1.address);
        expect(await score.teacherAddr(addr1.address)).ok;
    });
    it("teacherSetStudentScore", async function () {
        await score.addTeacher(addr1.address);
        expect(await score.teacherAddr(addr1.address)).ok;
        await teacher.connect(addr1).teacherSetStudentScore(addr2.address, 99);
        let student = await score.student(addr2.address);
        expect(student.toString()).to.equal("99");
    });
});