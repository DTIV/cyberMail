
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Header from "./components/Header/Header";
import { Routes,Router, Route, Link } from "react-router-dom";
import { detectProvider } from "./functions";
import MailMain from "./components/Mail/MailMain";
import Showcase from "./components/Showcase/Showcase";

function App() {
  const [connected, setConnected] = useState(false);
  const [getError, setError] = useState(false);
  const [getCurrentAccount, setCurrentAccount] = useState("");
  const [getCurrentNetwork, setCurrentNetwork] = useState("");
  const [getProvider, setProvider] = useState(false);


  useEffect(()=> {
    // Set provider and check connection
    const Disconnect = () => {
      setConnected(false)
      setCurrentAccount("")
      setCurrentNetwork("")
    }

    const provider = detectProvider()

    setProvider(provider)
    if(provider){
      provider.request({ method: 'eth_accounts' })
      .then((res) => {
        if(res.length > 0){
          setConnected(true)
          onConnect(provider)
        }else{
          Disconnect()
        }
      })
    }
  },[getCurrentAccount, getProvider])

  useEffect(() => { 
    // Handle account and network changes
    const handleAccountsChanged = async () => {
      const accounts = await getProvider.request({method: 'eth_accounts'})
      setCurrentAccount(accounts)
    }
    const handleNetworkChanged = async () => {
      const chainId = await getProvider.request({ method: 'eth_chainId' });
      setCurrentNetwork(parseInt(chainId))
    }
    if(connected){
      getProvider.on('accountsChanged', handleAccountsChanged);
      getProvider.on('chainChanged', handleNetworkChanged);
      return () => {
        getProvider.removeListener('accountsChanged', handleAccountsChanged);
        getProvider.removeListener('chainChanged', handleNetworkChanged);
      }
    }
  }, [connected, getProvider])
  
  const Connect = async () => {
    // METAMASK CONNECT
    if(getProvider) {
      if(getProvider !== window.ethereum) {
        console.error("Not window.ethereum provider!")
      }
      try{
        await getProvider.request({
          method: "eth_requestAccounts"
        })
      }catch(err){
        setError(err);
      }
      onConnect(getProvider)
    }
  }

  const onConnect = async (provider) => {
    // ETHERS.JS CONNECT
    const chain_id = await provider.request({ method: 'eth_chainId' })
    const eth = new ethers.providers.Web3Provider(provider);
    const accounts = await eth.listAccounts()
    try{
      const signer = eth.getSigner()
      const address = await signer.getAddress()
      provider.request({ method: 'eth_accounts' })
      .then((res) => {
        if(res.length > 0){
          setConnected(true)
          setCurrentAccount(accounts[0])
          setCurrentNetwork(parseInt(chain_id))
        }else{
          setConnected(false)
        }
      })
    }catch (err) {
      console.log(err)
    }
  }
  
  return (
    <div className="App">
      <Header 
      connected={connected} 
      connect={Connect} 
      account={getCurrentAccount}
      currentNetwork={getCurrentNetwork}
      detect={detectProvider}/>
      <Routes >
        <Route exact path="*" element={
          <MailMain 
            connected={connected} 
            connect={Connect} />}/>
      </Routes>
    </div>
    
  );
}
export default App;