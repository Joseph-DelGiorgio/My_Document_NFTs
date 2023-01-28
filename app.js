import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import abi from '/Users/josephdelgiorgio/SBT/my-app/src/contracts/contracts_SoulBound_Token_sol_SchoolDegrees.abi';
import App2 from '/Users/josephdelgiorgio/SBT/my-app/src/App2.css';
import index from '/Users/josephdelgiorgio/SBT/my-app/src/index.js';
import indexCss from '/Users/josephdelgiorgio/SBT/my-app/src/index.css';

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  function connectToWallet() {
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

  useEffect(() => {
    async function initializeWeb3() {
      try {
        if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
          const provider = window.web3.currentProvider;
          setWeb3(new Web3(provider));        
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);
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
    <div className="App" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
      <form onSubmit={handleMintSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
        <input name="degree" placeholder="Degree" style={{margin: "10px"}}/>
        <input name="school" placeholder="School" style={{margin: "10px"}}/>
        <input name="year" placeholder="Year" style={{margin: "10px"}}/>
        <input name="CID" placeholder="CID" style={{margin: "10px"}}/>
        <button class="btn" onCLick={connectToWallet}style={{margin: "10px"}}>Connect Wallet</button>
  
        <input type="text" id="mintTo" placeholder="Enter address to mint to" style={{margin: "10px"}}/>
        <input type="text" id="mintAmount" placeholder="Enter amount to mint" style={{margin: "10px"}}/>
        <input type="submit" value="Mint" style={{margin: "10px"}}/>
      </form>
      <p style={{margin: "10px"}}>Account: {account}</p>
    </div>
  );
  
  
  /* return (
    <div className="App">
      <form onSubmit={handleMintSubmit}>
      <input name="degree" placeholder="Degree" />
      <input name="school" placeholder="School" />
      <input name="year" placeholder="Year" />
      <input name="CID" placeholder="CID" />
      <button class="btn">Connect Wallet</button>
      
        <input type="text" id="mintTo" placeholder="Enter address to mint to" />
        <input type="text" id="mintAmount" placeholder="Enter amount to mint" />
        <input type="submit" value="Mint" />
      </form>
      <p>Account: {account}</p>
    </div>
  ); */
}

export default App;


