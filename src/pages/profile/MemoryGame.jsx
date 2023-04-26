import React, { useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { db } from "../../components/FBconfig";
import { query, where, collection, onSnapshot } from "firebase/firestore";
import MemoryCards from "../../components/MemoryCards";
import newAdele from "../../assets/images/newAdele.png";

function MemoryGame() {
  const { isUserLogged } = useContext(AuthContext);
  const [likes, setLikes] = useState([]);
  const [cards, setCards] = useState([]);

  function selectRandomElements(arr, desireNumberOfCards) {
    const randomElements = [];
    const exampleArr = [...arr];
    for (let i = 0; i < desireNumberOfCards; i++) {
      const randomIndex = Math.floor(Math.random() * exampleArr.length);
      randomElements.push(exampleArr[randomIndex]);
      exampleArr.splice(randomIndex, 1);
    }
    return randomElements;
  }

  function fetchLikes() {
    const userId = isUserLogged.uid;
    const likesRef = collection(db, "likes");
    const likesQuery = query(likesRef, where("userId", "==", userId));
    const unsubscribe = onSnapshot(likesQuery, (querySnapshot) => {
      const fetchedLikes = [];
      querySnapshot.forEach((doc) => {
        fetchedLikes.push({ id: doc.id, ...doc.data() });
      });

      fetchedLikes.sort((a, b) => {
        return a.timestamp - b.timestamp;
      });

      setLikes(fetchedLikes);
    });

    return unsubscribe;
  }

  useEffect(() => {
    const unsubscribe = fetchLikes();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    let selectedLikes;
    if (likes.length > 5) {
      selectedLikes = selectRandomElements(likes, 6);
    } else {
      selectedLikes = likes;
    }
    const selectedImageUrls = selectedLikes.map((like) => like.paintingUrl);

    // Create duplicates for the selected paintings
    const duplicatedUrls = selectedImageUrls.concat(selectedImageUrls);

    setCards(shuffleArray(duplicatedUrls));
  }, [likes]);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return (
    <>
      <div className="test-header-momory">
        <span className="memory-header-style" style={{ textAlign: "center" }}>
          Don't you remember ?
        </span>
        <img src={newAdele} alt="sticker of adele" style={{ width: "150px" }} />
      </div>
      <div className="memory-game-container">
        <div className="memory-game">
          {cards.length === 0 && (
            <>
              <h3>You have to like some paintings first.</h3>
            </>
          )}
          {cards.map((cardUrl, index) => (
            <MemoryCards key={index} imageUrl={cardUrl} />
          ))}
        </div>
      </div>
    </>
  );
}
export default MemoryGame;
