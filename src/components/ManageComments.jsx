import React, { useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { db } from "../components/FbConfig";
import {
  query,
  where,
  collection,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Button from "react-bootstrap/Button";
import { RiDeleteBin6Line } from "react-icons/ri";

function ManageComments() {
  const { isUserLogged } = useContext(AuthContext);
  const [comments, setComments] = useState([]);

  function fetchComments() {
    const userId = isUserLogged.uid;
    const commentsRef = collection(db, "comments");
    const commentsQuery = query(commentsRef, where("userId", "==", userId));
    const unsubscribe = onSnapshot(commentsQuery, (querySnapshot) => {
      const fetchedComments = [];
      querySnapshot.forEach((doc) => {
        fetchedComments.push({ id: doc.id, ...doc.data() });
      });

      fetchedComments.sort((a, b) => {
        return a.timestamp - b.timestamp;
      });

      setComments(fetchedComments);
    });

    return unsubscribe;
  }

  useEffect(() => {
    const unsubscribe = fetchComments();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  async function deleteComment(commentId) {
    try {
      await deleteDoc(doc(db, "comments", commentId));
      console.log("Comment deleted.");
    } catch (e) {
      console.error("Error deleting comment: ", e);
    }
  }

  return (
    <div className="manage-comments-container">
      <div className="manage-comments">
        {comments.length === 0 && <h3>no comments yet</h3>}
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <img
              className="comment-img"
              style={{ display: "block", borderRadius: "5px" }}
              src={comment.paintingUrl}
              alt={comment.paintingTitle}
            />
            <div className="userName text-center">
              {comment.timestamp && comment.timestamp.toDate().toLocaleString()}
              :
            </div>
            <div className="commentText text-center">{comment.commentText}</div>
            <div className="text-center">
              <Button
                style={{ fontSize: "1.2rem", padding: "0.1rem 0.3rem" }}
                variant="secondary"
                className="text-center delete-comment-btn"
                onClick={() => deleteComment(comment.id)}
              >
                <RiDeleteBin6Line />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageComments;
