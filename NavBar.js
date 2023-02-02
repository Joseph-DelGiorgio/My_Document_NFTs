import React from "react";
import '/Users/josephdelgiorgio/SBTD/my-app/src/web3.js'
const NavBar= ({ accounts, setAccounts}) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount(){
        if(window.ethereum){
            const accounts= await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);
        }
    }
    return(
        <div>
            {/*Left Side- Social Media Contact */}
            <div>
                <a href="https://github.com/Joseph-DelGiorgio" target="_blank">
                Github
                </a>
            </div>
            <div>
                <a href="https://twitter.com/JoeDelGiorgio1" target="_blank">
                Twitter
                </a>
            </div>


            {/* Right Side- Sections and Connect */}
            <div></div>

            {/* Connect */}
            {isConnected ?(
                <p>Wallet Connected</p>
            ) : (
            <button onClick={connectAccount}>Connect</button> 
            )}
        </div>
    );
};

export default NavBar;
