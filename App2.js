import React, { useState, useEffect } from "react";
import Web3 from "web3";
//import { web3 } from 'react-web3';
import 'react-web3';
const ethers = require('ethers');
const abi = require("/Users/josephdelgiorgio/SoulBound_Token_Degree/my-app/src/build/contracts_SoulBound_Token_sol_SchoolDegrees.abi");
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const account= ("privatekey");
const contract = new Web3.eth.Contract(abi, contractAddress);



async function App(){
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);


  async function fetchAbi() {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = new ethers.Contract(contractAddress, abi, provider);
    return contract.interface;
  }

  useEffect(() => {
    async function initializeWeb3() {
      if (window.ethereum) {
        const web3Provider = window.ethereum;
        setWeb3(new Web3(web3Provider));
        await window.ethereum.enable();
      } else if (window.web3) {
        const web3Provider = window.Web3.currentProvider;
        setWeb3(new Web3(web3Provider));
      } else {
        console.error("Non-Ethereum browser detected. You should consider trying Mist or MetaMask!");
      }
    }
    initializeWeb3();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const abi = await fetchAbi();
        const networkId = await web3.eth.net.getId();
        const contractAddress = abi.networks[networkId].address;
        const contract = new web3.eth.Contract(abi, contractAddress);
        setContract(contract);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    }
    if(web3) {
    fetchData();
    }
  }, [web3]);



  const handleMintSubmit = async (event) => {
    event.preventDefault();
    if(contract === null) {
        console.log("contract is not loaded yet, minting cannot be done.");
        return;
    }
    const account= ("d56d353de0efdd7c26ae0e677d9e52ffaf10fd0ae68b5a2f689eb8897c4927c6");
    
    const contract = new Web3.eth.Contract(abi, contractAddress);
    const form = event.target;
    const degree = form.elements["degree"].value;
    const school = form.elements["school"].value;
    const year = form.elements["year"].value;
    await contract.methods.mint(degree, school, year).send({ from: account });
  }


  return (
    <form onSubmit={handleMintSubmit}>
      <input name="degree" placeholder="Degree" />
      <input name="school" placeholder="School" />
      <input name="year" placeholder="Year" />
      <button type="submit">Mint</button>
    </form>
  )
}


export default App;
