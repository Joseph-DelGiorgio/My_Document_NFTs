const { ContractFactory } = require("ethers");
const { ethers } = require("hardhat");
const SchoolDegreesArtifact = require("/SoulBound_Token_Degree/artifacts/contracts/SchoolDegrees.sol/SchoolDegrees.json");

async function main() {
  const accounts = await ethers.getSigners();
  const from = accounts[0];

  console.log("Deploying contract...");
  const contractFactory = new ContractFactory(SchoolDegreesArtifact.abi, SchoolDegreesArtifact.bytecode, from);
  const contract = await contractFactory.deploy();

  console.log("Contract deployed at:", contract.address);
}


main()
.then(() => process.exit(0))
.catch((error) => {
console.error(error);
process.exit(1);
});
