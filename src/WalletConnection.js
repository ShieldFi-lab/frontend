import { useState } from "react";

export default function WalletConnection({ setAccount }) {
  const [localAccount, setLocalAccount] = useState(null);

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setLocalAccount(accounts[0]);
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Wallet connection error:", error);
      }
    } else {
      alert("Install MetaMask to use ShieldFi frontend");
    }
  }

  return (
    <div>
      {localAccount ? (
        <p>Connected: {localAccount}</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}
