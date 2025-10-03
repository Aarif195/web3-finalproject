import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';

// Connect wallet
export async function connectWallet() {
  const provider = await detectEthereumProvider();
  if (!provider) {
    alert('Please install MetaMask!');
    return null;
  }

  try {
    const accounts = await provider.request({ method: 'eth_requestAccounts' });
    return accounts[0];
  } catch (error) {
    console.error('User rejected the request:', error);
    return null;
  }
}

// Get balance
// export async function getBalance(account) {
//   try {
//     if (!window.ethereum) throw new Error('No Ethereum provider found');
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const balance = await provider.getBalance(account);
//     return ethers.utils.formatEther(balance);
//   } catch (error) {
//     console.error('Cannot get balance', error);
//     return null;
//   }
// }

// Get balance
export async function getBalance(account) {
  try {
    console.log("ethers object:", ethers);
    console.log("window.ethereum:", window.ethereum);

    if (!window.ethereum) throw new Error('No Ethereum provider found');

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log("Provider created:", provider);

    const balance = await provider.getBalance(account);
    console.log("Raw balance (wei):", balance.toString());

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
    const signer = provider.getSigner();

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
