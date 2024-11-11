import React, { useState } from "react";
import './index.css'; // 確保已經引入自訂樣式

function LotterySystem() {
  const [walletAddress, setWalletAddress] = useState("");
  const [participants, setParticipants] = useState([]);
  const [drawQuantity, setDrawQuantity] = useState(1);
  const [result, setResult] = useState([]);

  // Handle adding a participant
  const addParticipant = () => {
    if (walletAddress && !participants.includes(walletAddress)) {
      setParticipants([...participants, walletAddress]);
      setWalletAddress("");
    }
  };

  // Handle removing a participant
  const removeParticipant = (index) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  // Handle drawing participants
  const startDrawing = () => {
    if (drawQuantity > 0 && drawQuantity <= participants.length) {
      const shuffled = [...participants].sort(() => 0.5 - Math.random());
      setResult(shuffled.slice(0, drawQuantity));
    } else {
      alert("Please set a valid draw quantity!");
    }
  };

  return (
    <div className="container mt-5">
      {/* Header Section */}
      <header className="bg-primary text-white text-center py-4 mb-5 rounded">
        <h1 className="mb-0">Lottery System</h1>
      </header>

      {/* Add Participant Section */}
      <div className="mb-5">
        <h2 className="mb-3">Add Participant</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Wallet Address"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
          <button className="btn btn-primary" onClick={addParticipant}>
            + Add
          </button>
        </div>

        <ul className="list-group">
          {participants.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {index + 1} - {item}
              <button
                className="custom-close-btn"
                onClick={() => removeParticipant(index)}
                aria-label="Remove"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Set Draw Quantity Section */}
      <div className="mb-5">
        <h2 className="mb-3">Set Draw Quantity</h2>
        <div className="input-group mb-3">
          <input
            type="number"
            className="form-control"
            min="1"
            max={participants.length}
            value={drawQuantity}
            onChange={(e) => setDrawQuantity(Number(e.target.value))}
          />
          <button className="btn btn-primary" onClick={startDrawing}>
            Start Drawing
          </button>
        </div>
      </div>

      {/* Result Section */}
      <div className="mb-5">
        <h2 className="mb-3">Result</h2>
        {result.length > 0 ? (
          <ul className="list-group">
            {result.map((item, index) => (
              <li key={index} className="list-group-item">
                {index + 1} - {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No results to display.</p>
        )}
      </div>
    </div>
  );
}

export default LotterySystem;