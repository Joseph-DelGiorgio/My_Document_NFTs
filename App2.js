import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import abi from '/Users/josephdelgiorgio/SBT/my-app/src/contracts/contracts_SoulBound_Token_sol_SchoolDegrees.abi';
import App2 from '/Users/josephdelgiorgio/SBT/my-app/src/App2.css';
import index from '/Users/josephdelgiorgio/SBT/my-app/src/index.js';
import indexCss from '/Users/josephdelgiorgio/SBT/my-app/src/index.css';
import Buttons from '/Users/josephdelgiorgio/SBT/my-app/src/Buttons.css';
//const bytecode = require('/Users/josephdelgiorgio/SBT/my-app/src/build/src_contracts_SoulBound_Token_sol_SchoolDegrees.bin');
function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  function connectToWallet() {
    // Code to connect to a wallet, such as MetaMask
    if (typeof window.ethereum !== 'undefined') {
      // Use MetaMask's provider
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable().then(() => {
        // User has allowed account access
        console.log("Connected to wallet");
      }).catch(() => {
        // User has denied account access
        console.log("User denied account access");
      });
    } else if (typeof window.web3 !== 'undefined') {
      // Use Mist/wallet provider injection
      window.web3 = new Web3(window.web3.currentProvider);
      console.log("Connected to wallet");
    } else {
      console.log("No wallet detected. Please install MetaMask");
    }
  }
  connectToWallet();


  useEffect(() => {
    async function initializeWeb3() {
      try {
        if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
          const provider = window.web3.currentProvider;
          setWeb3(new Web3(provider));        
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);
          const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
          const contract = new web3.eth.Contract(abi, contractAddress);
          setContract(contract);
        }
      } catch (error) {
        console.error(error);
      }
    }
    initializeWeb3();
  }, []);

  const handleMintSubmit = async event => {
    event.preventDefault();
    if (!contract) {
      console.log("contract is not loaded yet, mint failed");
      return;
    }
    const toAddress = document.getElementById("mintTo").value;
    const amount = document.getElementById("mintAmount").value;
    try {
      const result = await contract.methods.mint(toAddress, amount).send({ from: account });
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
      <input name="degree" placeholder="Degree" />
      <input name="school" placeholder="School" />
      <input name="year" placeholder="Year" />
      <button type="submit">Mint</button>
      <button class="btn">Connect Wallet</button>
      <button class="function-button" id="function1">Function 1</button>
      <button class="function-button" id="function2">Function 2</button>
      <button class="function-button" id="function3">Function 3</button>
        <input type="text" id="mintTo" placeholder="Enter address to mint to" />
        <input type="text" id="mintAmount" placeholder="Enter amount to mint" />
        <input type="submit" value="Mint" />
      </form>
      <p>Account: {account}</p>
    </div>
  );
}

export default App;

