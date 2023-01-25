const ethers = require('ethers');
const abi = require('/Users/josephdelgiorgio/SoulBound_Token_Degree/my-app/src/build/contracts_SoulBound_Token_sol_SchoolDegrees.abi');
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';


async function fetchAbi() {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = new ethers.Contract(contractAddress, abi, provider);
    return contract.interface;
}

module.exports = fetchAbi;
