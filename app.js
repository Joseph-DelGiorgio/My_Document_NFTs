import React, { useState, useEffect } from "react";
import Web3 from "web3";

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  //const API_KEY = 

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
        const abi = await abi("./contracts/SoulBound_Token.sol");
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
