import { connectWallet, getBalance, sendETH } from './src/detect.js';

const connectButton = document.getElementById('connectButton');
const accountDisplay = document.getElementById('accountDisplay');
const sendButton = document.getElementById('sendButton');
const recipientInput = document.getElementById('recipient');
const amountInput = document.getElementById('amount');
const txStatus = document.getElementById('txStatus');

let currentAccount = null;

if (connectButton) {
    connectButton.addEventListener('click', async () => {
        const account = await connectWallet();
        
        if (account) {
            // ONLY proceed if connection was successful
            currentAccount = account;
            accountDisplay.textContent = `Connected account: ${account}`;
            
            const balance = await getBalance(account); 
            if (balance !== null) {
                accountDisplay.textContent += ` | Balance: ${balance} ETH`;
            }
        } else {
            // Clear if connection failed or was rejected
            currentAccount = null;
            accountDisplay.textContent = 'Wallet not connected.';
        }
    });
}


if (sendButton) {
    sendButton.addEventListener('click', async () => {
        if (!currentAccount) {
            alert("Please connect your wallet first.");
            return;
        }

        const recipient = recipientInput.value.trim();
        const amount = amountInput.value.trim();

        if (!recipient || !amount) {
            alert("Please enter recipient and amount.");
            return;
        }

        txStatus.textContent = "Sending transaction...";

        const tx = await sendETH(recipient, amount);
        if (tx) {
            txStatus.textContent = `Transaction sent! Hash: ${tx.hash}`;
        } else {
            txStatus.textContent = "Transaction failed.";
        }
    });
}
