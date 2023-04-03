import React, { useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { db } from "../../components/FbConfig";
import { query, where, collection, onSnapshot } from "firebase/firestore";

function MemoryGame() {
  const { isUserLogged } = useContext(AuthContext);
  const [likes, setLikes] = useState([]);
  const [arrayOfImageUrls, setArrayOfImageUrls] = useState([]);

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
  console.log("test array of urls", arrayOfImageUrls);

  return (
    <div className="manage-likes">
      {likes.length === 0 && <h3>No liked paintings yet</h3>}
      {likes.map((like) => (
        <div
          key={like.id}
          className="liked-painting"
          style={{ width: "200px" }}
        >
          <img
            style={{ display: "block", width: "200px" }}
            src={like.paintingUrl}
            alt={like.paintingTitle}
          />
        </div>
      ))}
    </div>
  );
}
export default MemoryGame;
