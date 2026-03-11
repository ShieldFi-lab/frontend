import { useState } from "react";
import { ethers } from "ethers";
import CoveragePoolAbi from "../contracts/CoveragePool.json";

const COVERAGE_POOL_ADDRESS = "0xYourCoveragePoolAddress";

export default function CoveragePoolInteraction({ account }) {
  const [status, setStatus] = useState("");

  async function simulatePayout() {
    if (!window.ethereum) return alert("Install MetaMask");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const pool = new ethers.Contract(COVERAGE_POOL_ADDRESS, CoveragePoolAbi, signer);

    try {
      const tx = await pool.payout(account, ethers.utils.parseEther("1"));
      setStatus("Payout sent...");
      await tx.wait();
      setStatus("Payout completed!");
    } catch (err) {
      console.error(err);
      setStatus("Error executing payout");
    }
  }

  return (
    <div>
      <button onClick={simulatePayout}>Simulate Payout</button>
      <p>{status}</p>
    </div>
  );
}
