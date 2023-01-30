const hre = require("hardhat");
require('dotenv').config();


async function main() {
  const myDegree = await hre.ethers.getContractFactory("MyDegree");
  const myDegreeNFT = await myDegree.deploy();
  await myDegreeNFT.deployed();

  console.log(
    `Your Soul Bound Degree NFT is deployed to ${myDegreeNFT.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
