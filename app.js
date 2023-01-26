import React, { useState, useEffect } from "react";
import "./App.css";
import Web3 from "web3";
import contract from "/Users/josephdelgiorgio/SoulBound_Token_Degree/my-app/src/artifacts/contracts/SoulBound_Token.sol/SchoolDegrees.json"
import abi from "/Users/josephdelgiorgio/SoulBound_Token_Degree/my-app/src/build-info/src_SoulBound_Token_sol_SchoolDegrees.abi"

function App(){
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [mintSuccess, setMintSuccess] = useState(false);
  const [mintError, setMintError] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      setWeb3(new Web3(Web3.givenProvider)); // connect to the injected web3 provider
      getCurrentAccount();
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      try{
        let contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
        let contract = new web3.eth.Contract(abi, contractAddress); // instantiate the contract with the ABI and address
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

  const getCurrentAccount = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    try {
      const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      console.log(accounts[0]);
    } else {
      console.log("Connect to MetaMask using the Connect button");
    }
    } catch (err) {
      console.error(err.message);
    }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };
  const handleMintSubmit = async (event) => {
    event.preventDefault();
    if(contract === null) {
      console.log("contract is not loaded yet, mint failed");
      return;
    }
    const to = document.getElementById("mintTo").value;
    const amount = document.getElementById("mintAmount").value;
    try {
      const result = await contract.methods.mint(to, amount).send({ from: account });
      console.log(result);
      alert("Mint Successful!");
    } catch (error) {
      console.error(error);
      alert("Mint Failed. Please check the console for more information.");
    }
  };
  
  return (
  <div className="App">
  <form onSubmit={handleMintSubmit}>
  <input type="text" id="mintTo" placeholder="Enter address to mint to" />
  <input type="text" id="mintAmount" placeholder="Enter amount to mint" />
  <input type="submit" value="Mint" />
  </form>
  <p>Account: {account}</p>
  </div>
);
}
  
  export default App;
