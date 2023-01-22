const { deploy } = require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");
require('dotenv').config()

const SchoolDegrees = require(`/Users/josephdelgiorgio/soul_bound_token/contracts/SchoolDegrees.sol`);

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract...");
  const contract = await deploy(SchoolDegrees, [], { deployer });

  console.log("Contract deployed at:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
