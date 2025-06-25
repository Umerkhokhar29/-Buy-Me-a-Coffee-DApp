import React, { useState, useRef } from "react";
import { BrowserProvider, Contract, parseEther } from "ethers";
import ABI from "../utils/contractABI.json";
import { contractAddress } from "../utils/contractAddress";
import "./cardstyle.css";

const coffeeOptions = [
  { name: "Espresso", price: "0.001", image: "/images/coffee1.jpg" },
  { name: "Latte", price: "0.002", image: "/images/coffee2.jpg" },
  { name: "Cappuccino", price: "0.003", image: "/images/coffee3.jpg" },
  { name: "Americano", price: "0.004", image: "/images/coffee4.jpg" },
  { name: "Feedback", price: "free", image: "/images/feedback.jpg" }
];

const BuyCoffee = ({ walletAddress }) => {
  const [formData, setFormData] = useState(
    coffeeOptions.map(() => ({ name: "", message: "" }))
  );
  const [toastVisible, setToastVisible] = useState(false);
  const cardRefs = useRef([]);

  const handleChange = (index, field, value) => {
    const updated = [...formData];
    updated[index][field] = value;
    setFormData(updated);
  };

  const handleTilt = (e, idx) => {
    const card = cardRefs.current[idx];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / 15).toFixed(2);
    const rotateY = (x / 15).toFixed(2);
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const resetTilt = (idx) => {
    const card = cardRefs.current[idx];
    if (card) card.style.transform = `rotateX(0deg) rotateY(0deg)`;
  };

  const buyCoffee = async (coffeePrice, index) => {
    const { name, message } = formData[index];

    // If it's the feedback card (index 4), just show toast — no MetaMask
    if (coffeePrice === "free" || Number(coffeePrice) === 0) {
      if (!name.trim() || !message.trim()) {
        return alert("Please enter your name and message before sending feedback.");
      }
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
      handleChange(index, "name", "");
      handleChange(index, "message", "");
      return;
    }
    

    try {
      if (!window.ethereum) return alert("Please install MetaMask!");
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const coffeeContract = new Contract(contractAddress, ABI, signer);
      const txn = await coffeeContract.buyCoffee(name, message, {
        value: parseEther(coffeePrice),
      });
      await txn.wait();
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
      handleChange(index, "name", "");
      handleChange(index, "message", "");
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed!");
    }
  };

  return (
    <div className="container my-4 position-relative">
      {toastVisible && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
          <div className="toast show align-items-center text-white bg-success border-0">
            <div className="d-flex">
              <div className="toast-body fw-semibold">
                ✅ Coffee purchased successfully!
              </div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => setToastVisible(false)}
              />
            </div>
          </div>
        </div>
      )}

      <div className="row">
        {coffeeOptions.map((coffee, idx) => (
          <div className="col-md-6 col-lg-3 mb-4" key={idx}>
            <div
              className="tilt-card"
              onMouseMove={(e) => handleTilt(e, idx)}
              onMouseLeave={() => resetTilt(idx)}
            >
              <div
                className="tilt-inner p-3"
                ref={(el) => (cardRefs.current[idx] = el)}
              >
                <img
                  src={coffee.image}
                  alt={coffee.name}
                  className="card-img-top rounded-top-4"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title fw-semibold">{coffee.name}</h5>
                  <div className="mb-2">
                    <input
                      className="form-control rounded-pill mb-2"
                      type="text"
                      maxLength={20}
                      placeholder="Your name"
                      value={formData[idx].name}
                      onChange={(e) =>
                        handleChange(idx, "name", e.target.value)
                      }
                    />
                    <textarea
                      className="form-control rounded-4"
                      rows="2"
                      maxLength={100}
                      placeholder="Your message"
                      value={formData[idx].message}
                      onChange={(e) =>
                        handleChange(idx, "message", e.target.value)
                      }
                    />
                  </div>
                  <button
                    className="btn btn-outline-primary w-100 rounded-pill fw-semibold"
                    onClick={() => buyCoffee(coffee.price, idx)}
                  >
                    Buy for {coffee.price} ETH
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCoffee;
