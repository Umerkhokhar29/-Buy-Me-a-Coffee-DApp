import React, { useState } from 'react';

const WalletConnect = ({ setWalletAddress }) => {
  const [connected, setConnected] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setWalletAddress(accounts[0]);
        setConnected(true);
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <button
      onClick={connectWallet}
      className={`btn btn-lg ${connected ? "btn-success" : "btn-primary"} rounded-pill px-4 py-2`}
    >
      {connected ? "✅ Wallet Connected" : "🔗 Connect Wallet"}
    </button>
  );
};

export default WalletConnect;
