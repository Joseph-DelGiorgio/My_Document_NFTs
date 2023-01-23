const { deploy } = require("@nomicfoundation/hardhat-chai-matchers");
const SchoolDegrees = require(`/Users/josephdelgiorgio/SoulBound_Token_Degree/artifacts/contracts/SchoolDegrees.sol/SchoolDegrees.json`);
const { provider } = require("@nomiclabs/hardhat-ethers");

require('dotenv').config()


async function main() {
  const signers = await provider.getSigners();


  console.log("Deploying contract...");
  const contract = await deploy(SchoolDegrees, [], { provider });

  console.log("Contract deployed at:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
