import React, { useState, useEffect } from "react";
import Web3 from "web3";
import fetchAbi from './fetchabi.js'
//const address= (0x5FbDB2315678afecb367f032d93F642f64180aa3);


function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const fetchAbi = require('./fetchabi.js').fetchAbi;

  const API_KEY = 'https://arb-goerli.g.alchemy.com/v2/wzo69fqo0ZyJ2SV0d14SnLdJh39J7iXj';

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.enable().then(() => {
        setWeb3(new Web3(window.ethereum));
      });
    } else if (window.web3) {
      setWeb3(new Web3(window.web3.currentProvider));
    }
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
    fetchData();
  }, []);



  const handleMintSubmit = async (event) => {
    event.preventDefault();
    if(contract === null) {
        console.log("contract is not loaded yet, minting cannot be done.");
        return;
    }
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

