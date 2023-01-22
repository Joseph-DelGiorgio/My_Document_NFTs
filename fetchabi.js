const ethers = require('ethers');
const abi = require('./contracts/SoulBound_Token.sol');
const contractAddress = '0x123456789abcdef';


async function fetchAbi() {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = new ethers.Contract(contractAddress, abi, provider);
    return contract.interface;
}

module.exports = fetchAbi;
