import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { ConnectWallet } from "@thirdweb-dev/react";
import fetchAbi from '/Users/josephdelgiorgio/SoulBound_Token_Degree/my-app/src/fetchabi.js'

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [walletAddress, setWalletAddress] = useState("")

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

  const connectWallet = async () => {
    // Check if MetaMask is installed on user's browser
    if(window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const chainId = await window.ethereum.request({ method: 'eth_chainId'});
    // Check if user is connected to Mainnet
    //0x5 = Goerli Testnet
    //0x1 = Eth mainnet
    if(chainId != '0x5') {
      alert("Please connect to Goerli testnet");
    } else {
      let wallet = accounts[0];
      setWalletAddress(wallet);
    }
    } else {
      alert("Please install Meta-Mask");
    }
  }

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
    <input name="degree" placeholder="Degree Name" required/>
    <input name="school" placeholder="School Name" required/>
    <input name="year" placeholder="Year" required/>
    <button type="submit">Mint</button>
  <ConnectWallet
    isConnected={() => !!walletAddress}
    signerAddress={walletAddress}
    getSigner={connectWallet}
    provider={web3}
    accentColor="#f213a4"
    colorMode="dark"
  />
</form>
);
}

export default App;
