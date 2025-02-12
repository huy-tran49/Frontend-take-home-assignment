import { Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import NFTContainer from "./NFTContainer"
import axios from "axios"

const Wallet = () => {

    const [walletAddress, setWalletAddress] = useState(null)
    // set NFTData and passing it to NFTContainer children
    const [NFTData, setNFTData] = useState(null)

    const connectWallet = async () => {
        // allow user to connect to wallet on click
        if (typeof window.ethereum !== 'undefined') {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'})
            
            setWalletAddress(accounts[0])
            // assigned NFT account owner to walletAddress
        }
    }

    const getNFTData = () => {
        if(!walletAddress) return
        // get request for NFT items by onwer, which was assigned to walletAddress
        axios.get(`https://api.rarible.org/v0.1/items/byOwner/?owner=ETHEREUM:${walletAddress}`)
                .then(res => setNFTData(res.data))
                .catch(err => console.log(err))
    }

    // run useEffect whenever the state of walletAddress changed
    useEffect(()=>{
        getNFTData()
    },[walletAddress])

    return (
        <>
            <div className="main-wallet">
                <h3>Account:{walletAddress}</h3>
                <Button onClick={connectWallet}>Connect Wallet</Button>
                <NFTContainer NFTData={NFTData}/>
            </div>
        </>
    )
}

export default Wallet