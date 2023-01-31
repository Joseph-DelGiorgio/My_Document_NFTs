import {useState} from 'react';
import { ethers, BigNumber } from 'ethers';
import '/Users/josephdelgiorgio/SBTD/my-app/src/web3.js'
import MyDegree from '/Users/josephdelgiorgio/SBTD/my-app/src/MyDegree.json';

const MyDegreeAddress= '0x04d5e6E875dda11DaD3FF81B3318f651c851046c';

const MintDegree = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
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
        <div>
            <h1>NFT Documents</h1>
            <p>
            This Project allows users to Mint important documents to become immutable, Soul Bound NFTs. 
            "SoulBound" means that the NFT cannot be sent from the address it was minted to.
            </p>
            {isConnected ? (
                <div>
                    <div>
                        <button onClick={handleDecrement}>-</button>
                        <input type="number" value={mintAmount} />
                        <button onClick={handleIncrement}>+</button>
                    </div>
                <button onClick={safeMint}>Mint Document</button>
            </div>
        ) : (
            <p>You must be connect your wallet to Mint</p>
        )}
        </div>
    );

}

export default MintDegree;
