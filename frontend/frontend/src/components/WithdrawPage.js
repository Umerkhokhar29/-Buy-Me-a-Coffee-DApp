import React, { useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import ABI from "../utils/contractABI.json";
import { contractAddress } from "../utils/contractAddress";

const WithdrawPage = () => {
  const [accessGranted, setAccessGranted] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const correctPassword = "superSecret123"; // Replace with your own password

  const handleUnlock = () => {
    if (inputPassword === correctPassword) {
      setAccessGranted(true);
    } else {
      alert("Wrong password!");
    }
  };

  const handleWithdraw = async () => {
    try {
      if (!window.ethereum) return alert("Please install MetaMask!");

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, ABI, signer);

      setLoading(true);
      const txn = await contract.withdrawTips();
      await txn.wait();
      alert("✅ Funds withdrawn successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Withdrawal failed or you're not the owner!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container text-center mt-5">
      {!accessGranted ? (
        <div className="w-100" style={{ maxWidth: "400px", margin: "0 auto" }}>
          <h4 className="mb-3">Enter Admin Password</h4>
          <input
            type="password"
            className="form-control mb-2"
            placeholder="Enter password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          />
          <button onClick={handleUnlock} className="btn btn-primary w-100">
            Unlock
          </button>
        </div>
      ) : (
        <div>
          <h4 className="mb-3">Withdraw All Tips</h4>
          <button
            className="btn btn-success px-4 py-2"
            onClick={handleWithdraw}
            disabled={loading}
          >
            {loading ? "Processing..." : "Withdraw Funds 💸"}
          </button>
        </div>
      )}
    </div>
  );
};

export default WithdrawPage;
