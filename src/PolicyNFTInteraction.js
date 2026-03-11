import { useState } from "react";
import { ethers } from "ethers";
import PolicyNFTAbi from "../contracts/PolicyNFT.json"; 

const POLICY_NFT_ADDRESS = "0xYourPolicyNFTAddress";

export default function PolicyNFTInteraction({ account }) {
  const [txStatus, setTxStatus] = useState("");

  async function mintPolicy() {
    if (!window.ethereum) return alert("Install MetaMask");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const policyNFT = new ethers.Contract(POLICY_NFT_ADDRESS, PolicyNFTAbi, signer);

    try {
      const tx = await policyNFT.mintPolicy(
        account,
        ethers.utils.parseEther("1"),
        30 * 24 * 60 * 60
      );
      setTxStatus("Transaction sent...");
      await tx.wait();
      setTxStatus("Policy minted!");
    } catch (err) {
      console.error(err);
      setTxStatus("Error minting policy");
    }
  }

  return (
    <div>
      <button onClick={mintPolicy}>Mint Policy NFT</button>
      <p>{txStatus}</p>
    </div>
  );
}
