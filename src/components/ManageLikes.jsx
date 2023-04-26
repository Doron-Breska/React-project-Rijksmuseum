import React, { useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { db } from "../components/FBconfig";
import {
  query,
  where,
  collection,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Button from "react-bootstrap/Button";

function ManageLikes() {
  const { isUserLogged } = useContext(AuthContext);
  const [likes, setLikes] = useState([]);

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

  async function unlikePainting(likeId) {
    try {
      await deleteDoc(doc(db, "likes", likeId));
      console.log("Like removed.");
    } catch (e) {
      console.error("Error unliking painting: ", e);
    }
  }

  return (
    <div className="manage-likes-container">
      <div className="manage-likes">
        {likes.length === 0 && <h3>You did not like anything yet</h3>}
        {likes.map((like) => (
          <div key={like.id} className="liked-painting">
            <img
              style={{ display: "block", borderRadius: "5px" }}
              src={like.paintingUrl}
              alt={like.paintingTitle}
              className="liked-img"
            />
            <div className="paintingTitle">"{like.paintingTitle}"</div>
            <div className="likeTimestamp painting-info">
              {like.timestamp && like.timestamp.toDate().toLocaleString()}
            </div>
            <div className="text-center">
              <Button
                className="unlike-btn"
                variant="secondary"
                onClick={() => unlikePainting(like.id)}
              >
                UNLIKE
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageLikes;
