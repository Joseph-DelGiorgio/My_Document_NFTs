import React, { useState, useEffect } from "react";
import "./App.css";
import Web3 from "web3";
//import ethers from '/Users/josephdelgiorgio/SoulBound_Token_Degree/my-app/package.json';
//import abi from "/Users/josephdelgiorgio/SoulBound_Token_Degree/my-app/src/build/contracts_SoulBound_Token_sol_SchoolDegrees.abi";
//console.log(abi);
//const contract = Web3.eth.Contract(abi, contractAddress);
//contract= contractAddress;


function App(){
const [web3, setWeb3] = useState(null);
const [contract, setContract] = useState(null);
const [account, setAccount] = useState(null);

useEffect(() => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        setWeb3(new Web3(Web3.givenProvider)); // connect to the injected web3 provider
        getCurrentAccount();
    }
}, []);

useEffect(() => {
    async function fetchData() {
        try {
            const contract= import("/Users/josephdelgiorgio/SoulBound_Token_Degree/my-app/src/artifacts/contracts/SoulBound_Token.sol/SchoolDegrees.json")
            const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
            const abi= import("/Users/josephdelgiorgio/SoulBound_Token_Degree/my-app/src/build-info/src_SoulBound_Token_sol_SchoolDegrees.abi");
            contract = new web3.eth.Contract(abi, contractAddress); // instantiate the contract with the ABI and address
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
    // Add minting logic here
    // Example: contract.methods.mint(to, amount).send({ from: account })
};

return (
    <div className="App">
        <form onSubmit={handleMintSubmit}>
            <input type="submit" value="Mint" />
        </form>
        <p>Account: {account}</p>
    </div>
);
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
