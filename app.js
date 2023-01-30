import React from 'react';
import NavBar from "./NavBar";
import MintDegree from "/Users/josephdelgiorgio/SBTD/my-app/src/MintDegree.js"
//import { useWeb3 } from 'web3-react';
//import { Contract, ContractFactory } from 'ethers';

function App(){
  const [accounts, setAccounts] = useState([]);

  return (
    <div className= "overlay">
      <div className= "App">
        <NavBar accounts={accounts} setAccounts={setAccounts} />
        <MintDegree accounts={accounts} setAccounts={setAccounts} />
      </div>
    <div className='rainbow-background'></div>
  </div>
  );
}

export default App;

  /*return (
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



