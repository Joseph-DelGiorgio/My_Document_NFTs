require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-chai-matchers");
require('dotenv').config()


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity:{
  version: "0.8.17",
  networks: {
    goerli: {
      url: process.env.API_KEY,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
}
};
