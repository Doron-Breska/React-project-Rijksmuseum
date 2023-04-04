import React, { useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { db } from "../../components/FbConfig";
import { query, where, collection, onSnapshot } from "firebase/firestore";
import MemoryCards from "../../components/MemoryCards";

function MemoryGame() {
  const { isUserLogged } = useContext(AuthContext);
  const [likes, setLikes] = useState([]);
  const [arrayOfImageUrls, setArrayOfImageUrls] = useState([]);
  const [cards, setCards] = useState([]);

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
    setArrayOfImageUrls(
      likes.map((like) => {
        return like.paintingUrl;
      })
    );
  }, [likes]);

  useEffect(() => {
    const duplicatedUrls = arrayOfImageUrls.concat(arrayOfImageUrls);
    setCards(shuffleArray(duplicatedUrls));
  }, [arrayOfImageUrls]);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  return (
    <>
      <h3 style={{ textAlign: "center" }}>
        Memory game with your favorite paintings
      </h3>
      <div className="memory-game">
        {cards.map((cardUrl, index) => (
          <MemoryCards key={index} imageUrl={cardUrl} />
        ))}
      </div>
    </>
  );
}
export default MemoryGame;
