import React, { useState, useEffect } from "react";
import Web3 from "web3";

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const API_KEY = 'https://arb-goerli.g.alchemy.com/v2/wzo69fqo0ZyJ2SV0d14SnLdJh39J7iXj';

  useEffect(() => {
    if (window.ethereum) {
      setWeb3(new Web3(window.ethereum));
    } else if (window.web3) {
      setWeb3(new Web3(window.web3.currentProvider));
    } else {
      // Connect to the provider
      const web3 = new Web3(API_KEY);
      setWeb3(web3);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        //generateABI is not defined, assuming it's supposed to be a function that returns the ABI of the contract
        const abi = await generateABI("./contracts/SoulBound_Token.sol");
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
