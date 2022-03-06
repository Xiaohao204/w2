// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
// const hre = require("hardhat");
const { ethers, artifacts, network } = require('hardhat');
const { writeAbiAddr } = require('./artifact_saver.js')

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("account balance:", (await deployer.getBalance()).toString());
  
  const Score = await ethers.getContractFactory("Score");
  const score = await Score.deploy();
  await score.deployed();
  console.log("score.address：", score.address);
  
  const Teacher = await ethers.getContractFactory("Teacher");
  const teacher = await Teacher.deploy(score.address);
  await teacher.deployed();
  console.log("teacher.address：", teacher.address);

  let artifactScore = await artifacts.readArtifact("Score");
  await writeAbiAddr(artifactScore, score.address, "Score", network.name);
  let artifactTeacher = await artifacts.readArtifact("Teacher");
  await writeAbiAddr(artifactTeacher, teacher.address, "Teacher", network.name);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});
