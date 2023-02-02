import {useState} from 'react';
import { ethers, BigNumber } from 'ethers';
import '/Users/josephdelgiorgio/SBTD/my-app/src/web3.js'
import MyDegree from '/Users/josephdelgiorgio/SBTD/my-app/src/MyDegree.json';

const MyDegreeAddress= '';

const MintDegree = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const [ipfsHash, setIpfsHash] = useState("");
    const isConnected = Boolean(accounts[0]);

    async function safeMint(){
        if(window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                MyDegreeAddress,
                MyDegree.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.01 * mintAmount).toString()),
                });
                console.log('response', response);
            } catch(err) {
                console.log("error", err)
            }
        }
    }

    const handleDecrement = () => {
        if(mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };

    const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    };
    return(
      <div style={{ textAlign: "center" }}>
        <h1 style={{ color: "white", fontSize: "36px" }}>NFT Documents</h1>
        <p style={{ color: "white", fontSize: "18px", margin: "0 20px" }}>
          This Project allows users to Mint important documents to become immutable, Soul Bound NFTs.
          "SoulBound" means that the NFT cannot be sent from the address it was minted to.
        </p>
        <div style={{ margin: "20px 0" }}>
          <input
            type="text"
            placeholder="Enter IPFS hash of the document"
            value={ipfsHash}
            onChange={(e) => setIpfsHash(e.target.value)}
            style={{ padding: "10px 20px", textAlign: "center" }}
          />
        </div>
        {isConnected ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
              <button onClick={handleDecrement} style={{ padding: "10px 20px" }}>
                -
              </button>
              <input type="number" value={mintAmount} style={{ padding: "10px 20px", textAlign: "center" }} />
              <button onClick={handleIncrement} style={{ padding: "10px 20px" }}>
                +
              </button>
            </div>
            <button onClick={safeMint} style={{ padding: "15px 20px", margin: "10px", backgroundColor: "white", color: "black", border: "none", borderRadius: "5px", fontSize: "18px" }}>
              Mint Document
            </button>
          </div>
        ) : (
          <p style={{ color: "white", fontSize: "18px" }}>You must be connect your wallet to Mint</p>
        )}
      </div>
  );


    
    
    
    
    /*return(
        <div style={{ textAlign: "center" }}>
          <h1 style={{ color: "white", fontSize: "36px" }}>NFT Documents</h1>
          <p style={{ color: "white", fontSize: "18px", margin: "0 20px" }}>
            This Project allows users to Mint important documents to become immutable, Soul Bound NFTs.
            "SoulBound" means that the NFT cannot be sent from the address it was minted to.
          </p>
          {isConnected ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
                <button onClick={handleDecrement} style={{ padding: "10px 20px" }}>
                  -
                </button>
                <input type="number" value={mintAmount} style={{ padding: "10px 20px", textAlign: "center" }} />
                <button onClick={handleIncrement} style={{ padding: "10px 20px" }}>
                  +
                </button>
              </div>
              <button onClick={safeMint} style={{ padding: "15px 20px", margin: "10px", backgroundColor: "white", color: "black", border: "none", borderRadius: "5px", fontSize: "18px" }}>
                Mint Document
              </button>
            </div>
          ) : (
            <p style={{ color: "white", fontSize: "18px" }}>You must be connect your wallet to Mint</p>
          )}
        </div>
    ); */
      


}

export default MintDegree;
