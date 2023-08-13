import './App.css';
import Upload from "./artifacts/contracts/Upload.sol/Upload.json"
import { useState,useEffect } from 'react';
import { ethers } from 'ethers';
import FileUpload from './components/FileUpload';
import Display from './components/Display';

function App() {
  const [account,setAccount]=useState("");
  const [contract,setContract]=useState(null);
  const [provider,setProvider]=useState(null);
  const [modal,setModal]=useState(null);
  useEffect(()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider = async () =>{
      if(provider){
        window.ethereum.on("chainChanged",()=>{
          window.location.reload();
        });

        window.ethereum.on("accountsChanged",()=>{
          window.location.reload();
        })
        await provider.send("eth_requestAccounts",[]);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const contract = new ethers.Contract(
          contractAddress,Upload.abi,signer
        )
        console.log(contract)
        setContract(contract)
        setProvider(provider)
      }else{
        alert("Metamask is not installed");
      }
    };
    provider && loadProvider()
  },[])
  return (
    <div>
      <div className='toporder'>
        <img className='photoipfs' src='https://i.imgur.com/xmrplgH.png'/>
      <h1 className='headingdapp'>
        dappDrive</h1>
      </div>
      <p className='myAccount'>
        Account : {account ? account : "Not Connected"} 
      </p>
      <FileUpload account={account} provider={provider} contract={contract}/>
      <Display contract={contract} account={account}/>
    </div>
  );
}

export default App;
