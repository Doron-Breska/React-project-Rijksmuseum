import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import {
  BsFillHeartFill,
  BsChatSquareTextFill,
  BsShareFill,
} from "react-icons/bs";
import Button from "react-bootstrap/Button";
import ModalBack from "./ModalBack";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
  addDoc,
  collection,
  deleteDoc,
  query,
  serverTimestamp,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../components/FbConfig";

function CardsModal({ paintings }) {
  const [numLikes, setNumLikes] = useState(0);
  const [numComments, setNumComments] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [selectedPainting, setSelectedPainting] = useState({});
  const { isUserLogged } = useContext(AuthContext);

  function handleCommentsClick(paint) {
    setSelectedPainting(paint);
    setShowComments(true);
  }

  function handleCloseComments() {
    setSelectedPainting(null);
    setShowComments(false);
  }
  async function handleLikeButtonClick(paint) {
    const userId = isUserLogged.uid;
    const paintingId = paint.id;
    const paintingUrl = paint.webImage.url;
    const paintingTitle = paint.title;

    // Check if the user already liked the painting
    const likesRef = collection(db, "likes");
    const likesQuery = query(
      likesRef,
      where("userId", "==", userId),
      where("paintingId", "==", paintingId)
    );
    const snapshot = await getDocs(likesQuery);

    if (snapshot.empty) {
      // User didn't like the painting yet, so add a like
      const likeData = {
        paintingId: paintingId,
        userId: userId,
        paintingTitle: paintingTitle,
        paintingUrl: paintingUrl,
        timestamp: serverTimestamp(),
      };
      try {
        const docRef = await addDoc(collection(db, "likes"), likeData);
        console.log("Like added with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding like: ", e);
      }
    } else {
      // User already liked the painting, so remove the like
      try {
        const likeDoc = snapshot.docs[0];
        await deleteDoc(likeDoc.ref);
        console.log("Like removed.");
      } catch (e) {
        console.error("Error removing like: ", e);
      }
    }

    // Update the numLikes variable
    fetchNumLikes(paintingId);
  }

  async function fetchNumLikes(paintingId) {
    const likesRef = collection(db, "likes");
    const numLikesSnapshot = await getDocs(
      query(likesRef, where("paintingId", "==", paintingId))
    );
    setNumLikes((prevNumLikes) => ({
      ...prevNumLikes,
      [paintingId]: numLikesSnapshot.size,
    }));
  }

  useEffect(() => {
    paintings.forEach((paint) => {
      fetchNumLikes(paint.id);
    });
  }, [paintings]);

  return (
    <>
      {paintings.map((paint) => {
        return (
          <Card key={paint.id} className="bg-dark text-white my-3 paint">
            <Card.Img src={paint.webImage.url} alt="Card image" />
            <Card.ImgOverlay>
              <Button
                className="btn position-absolute bottom-0 end-0"
                variant="secondary"
                disabled
                id="counters-btn"
              >
                {numLikes[paint.id] || 0} - <BsFillHeartFill />
                <br />
                {numComments} - <BsChatSquareTextFill />
              </Button>
              <Card.Title className="bg-secondary d-inline px-1">
                {paint.title}
              </Card.Title>
            </Card.ImgOverlay>
            <Card.Text className="text-center">{paint.longTitle}</Card.Text>
            <Card.Text className="d-flex justify-content-between">
              <Button
                disabled={!isUserLogged}
                variant="secondary"
                id="like-btn"
                onClick={() => handleLikeButtonClick(paint)}
              >
                <BsFillHeartFill />
              </Button>
              <Button
                disabled={!isUserLogged}
                id="comments-btn"
                variant="secondary"
                onClick={() => handleCommentsClick(paint)}
              >
                <BsChatSquareTextFill />
              </Button>
              <Button
                disabled={!isUserLogged}
                id="share-btn"
                variant="secondary"
              >
                <BsShareFill />
              </Button>
            </Card.Text>
          </Card>
        );
      })}
      <ModalBack
        selectedPainting={selectedPainting}
        show={showComments}
        handleClose={handleCloseComments}
        numComments={numComments}
      />
    </>
  );
}

export default CardsModal;
