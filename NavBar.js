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
            <div>Github</div>
            <div>Twitter</div>


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
