import React, { useState } from "react";

function MemoryCard({ imageUrl }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardBackUrl =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg";

  function handleClick() {
    setIsFlipped((prevIsFlipped) => !prevIsFlipped);
  }

  return (
    <div
      // className={`memory-card ${isFlipped ? "flipped" : ""}`}
      onClick={handleClick}
      style={{ width: "250px", height: "370px", border: "1px solid black" }}
    >
      {isFlipped ? (
        <img src={imageUrl} alt="memory card" style={{ width: "100%" }} />
      ) : (
        <img src={cardBackUrl} alt="card back" style={{ width: "100%" }} />
      )}
    </div>
  );
}

export default MemoryCard;
