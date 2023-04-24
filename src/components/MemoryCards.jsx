import React, { useState } from "react";

function MemoryCards({ imageUrl }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardBackUrl =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg";

  function handleClick() {
    setIsFlipped((prevIsFlipped) => !prevIsFlipped);
  }

  return (
    <div onClick={handleClick} className="memory-game-card">
      {isFlipped ? (
        <img
          className="memory-crad-img"
          src={imageUrl}
          alt="memory card"
          style={{ width: "100%", objectFit: "cover" }}
        />
      ) : (
        <img
          className="memory-crad-img"
          src={cardBackUrl}
          alt="card back"
          style={{ width: "100%" }}
        />
      )}
    </div>
  );
}

export default MemoryCards;
