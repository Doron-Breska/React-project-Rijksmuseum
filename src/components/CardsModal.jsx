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
import { db } from "./fbconfig";

function CardsModal({ paintings }) {
  const [numLikes, setNumLikes] = useState({});
  const [numComments, setNumComments] = useState({});
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

    //// check if the user already liked the painting
    const likesRef = collection(db, "likes");
    const likesQuery = query(
      likesRef,
      where("userId", "==", userId),
      where("paintingId", "==", paintingId)
    );
    const snapshot = await getDocs(likesQuery);

    if (snapshot.empty) {
      ////// if not-
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
      //// if yes-
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

  async function fetchNumComments(paintingId) {
    const commentsRef = collection(db, "comments");
    const numCommentsSnapshot = await getDocs(
      query(commentsRef, where("paintingId", "==", paintingId))
    );
    setNumComments((prevNumComments) => ({
      ...prevNumComments,
      [paintingId]: numCommentsSnapshot.size,
    }));
  }

  useEffect(() => {
    paintings.forEach((paint) => {
      fetchNumLikes(paint.id);
    });
  }, [paintings]);

  useEffect(() => {
    paintings.forEach((paint) => {
      fetchNumLikes(paint.id);
      fetchNumComments(paint.id);
    });
  }, [paintings]);

  function updateNumComments(paintingId) {
    fetchNumComments(paintingId);
  }

  function handleShareButtonClick(paint) {
    const paintingUrl = paint.webImage.url;
    const paintingTitle = paint.title;

    const shareData = {
      title: `I saw this painting and thought of you, it's called - ${paintingTitle}`,
      text: `Here's the link - ${paintingUrl}`,
      url: paintingUrl,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      const emailSubject = encodeURIComponent(
        `I saw this painting and thought of you, it's called - ${paintingTitle}`
      );
      const emailBody = encodeURIComponent(`Here's the link - ${paintingUrl}`);
      const mailtoLink = `mailto:?subject=${emailSubject}&body=${emailBody}`;

      window.open(mailtoLink, "_blank");
    }
  }

  return (
    <>
      {paintings.map((paint) => {
        return (
          <Card
            key={paint.id}
            className="bg-dark text-white my-3 paint"
            style={{ borderRadius: "9px" }}
          >
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
                {numComments[paint.id] || 0} - <BsChatSquareTextFill />
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
                onClick={() => handleShareButtonClick(paint)}
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
        updateNumComments={updateNumComments}
      />
    </>
  );
}

export default CardsModal;
