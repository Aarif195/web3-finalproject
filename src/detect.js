import { ethers } from 'ethers';

// Connect wallet
export async function connectWallet() {
  console.log("ATTEMPTING WALLET CONNECTION..."); 

  if (typeof window.ethereum === 'undefined') {
    alert('Please install MetaMask!');
    return null;
  }

  try {
   
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    if (accounts.length === 0) {
        console.warn('User rejected or closed the connection prompt.');
        return null;
    }

    console.log("CONNECTION SUCCESSFUL, ACCOUNT:", accounts[0]);
    return accounts[0]; 
  } catch (error) {
    if (error.code === 4001) {
        console.warn('User rejected the connection request.');
    } else {
        console.error('Connection failed:', error);
    }
    return null;
  }
}

// Get balance
export async function getBalance(account) {
  try {
    if (!window.ethereum) throw new Error('No Ethereum provider found');
    
    const provider = new ethers.providers.Web3Provider(window.ethereum); 
    const balance = await provider.getBalance(account);
    
    return ethers.utils.formatEther(balance);
  } catch (error) {
    console.error('Cannot get balance', error);
    return null;
  }
}

// Send ETH
export async function sendETH(to, amountEth) {
  try {
    if (!window.ethereum) throw new Error('No Ethereum provider found');
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner(); 

    const tx = await signer.sendTransaction({
      to,
      value: ethers.utils.parseEther(amountEth),
    });

    return tx;
  } catch (error) {
    console.error('Error sending ETH:', error);
    return null;
  }
}
