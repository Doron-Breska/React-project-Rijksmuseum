import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { db } from "../components/FbConfig";
import { query, where, onSnapshot } from "firebase/firestore";

function ModalBack({ selectedPainting, show, handleClose }) {
  const { isUserLogged } = useContext(AuthContext);
  const [fullscreen, setFullscreen] = useState("md - down");
  const [inputValue, setInputValue] = useState("");
  const [comments, setComments] = useState([]);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
  }

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }
  console.log("test for image web url", selectedPainting);

  async function addComment(e) {
    e.preventDefault();
    const paintingId = selectedPainting.id;
    const paintingTitle = selectedPainting.title;
    const paintingUrl = selectedPainting.webImage.url;
    const userId = isUserLogged.uid;
    const commentText = inputValue;
    const userName = isUserLogged.displayName;

    const commentData = {
      paintingId: paintingId,
      userId: userId,
      paintingTitle: paintingTitle,
      paintingUrl: paintingUrl,
      commentText: commentText,
      userName: userName,
      timestamp: serverTimestamp(),
    };
    try {
      const docRef = await addDoc(collection(db, "comments"), commentData);
      console.log("Comment added with ID: ", docRef.id);
      alert("comment added");
      setInputValue("");
    } catch (e) {
      console.error("Error adding comment: ", e);
    }
  }

  async function fetchComments() {
    const paintingId = selectedPainting.id;
    const commentsRef = collection(db, "comments");
    const commentsQuery = query(
      commentsRef,
      where("paintingId", "==", paintingId)
    );
    const unsubscribe = onSnapshot(commentsQuery, (querySnapshot) => {
      const fetchedComments = [];
      querySnapshot.forEach((doc) => {
        fetchedComments.push({ id: doc.id, ...doc.data() });
      });

      // Sort comments by timestamp
      fetchedComments.sort((a, b) => {
        return a.timestamp - b.timestamp;
      });

      setComments(fetchedComments);
    });

    return unsubscribe;
  }

  useEffect(() => {
    if (selectedPainting) {
      fetchComments();
    }
  }, [selectedPainting]);

  return (
    <Modal
      show={show}
      fullscreen={fullscreen}
      onHide={handleClose}
      onShow={() => handleShow("md-down")}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Comments related to {selectedPainting && selectedPainting.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div id="msgs">
          {comments.length === 0 && <h3>no comments yet</h3>}
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="userName">{comment.userName}:</div>
              <div className="commentText">{comment.commentText}</div>
            </div>
          ))}
        </div>
        <Form onSubmit={addComment}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Write something.."
              value={inputValue}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalBack;
