import { useState } from "react";
import WalletConnection from "./components/WalletConnection";
import PolicyNFTInteraction from "./components/PolicyNFTInteraction";
import CoveragePoolInteraction from "./components/CoveragePoolInteraction";

function App() {
  const [account, setAccount] = useState(null);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>ShieldFi MVP</h1>
      <WalletConnection setAccount={setAccount} />
      {account && (
        <>
          <PolicyNFTInteraction account={account} />
          <CoveragePoolInteraction account={account} />
        </>
      )}
    </div>
  );
}

export default App;
