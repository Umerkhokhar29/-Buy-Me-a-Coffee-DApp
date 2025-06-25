import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WalletConnect from "./components/WalletConnect";
import BuyCoffee from "./components/BuyCoffee";
import CoffeeList from "./components/CoffeeList";
import WithdrawPage from "./components/WithdrawPage"; // <-- New component
import 'bootstrap/dist/css/bootstrap.min.css';

function Home({ walletAddress, setWalletAddress }) {
  return (
    <div className="container py-5 bg-light rounded-4 shadow-sm">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">☕ Buy Me a Crypto Coffee</h1>
        <p className="text-muted">Support with a small crypto coffee gesture</p>
        <WalletConnect setWalletAddress={setWalletAddress} />
      </div>

      {walletAddress && (
        <>
          <div className="alert alert-success text-center fw-semibold" role="alert">
            Connected: <span className="text-monospace">{walletAddress}</span>
          </div>
          <BuyCoffee walletAddress={walletAddress} />
          <CoffeeList />
        </>
      )}
    </div>
  );
}

function App() {
  const [walletAddress, setWalletAddress] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home walletAddress={walletAddress} setWalletAddress={setWalletAddress} />} />
        <Route path="/withdraw" element={<WithdrawPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
