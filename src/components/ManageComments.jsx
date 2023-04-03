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

      // Sort comments by timestamp
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
    <div className="manage-comments">
      {comments.length === 0 && <h3>no comments yet</h3>}
      {comments.map((comment) => (
        <div key={comment.id} className="comment" style={{ width: "200px" }}>
          <img
            style={{ display: "block", width: "200px" }}
            src={comment.paintingUrl}
            alt={comment.paintingTitle}
          />
          <div className="userName">
            {comment.timestamp && comment.timestamp.toDate().toLocaleString()}:
          </div>
          <div className="commentText">{comment.commentText}</div>
          <Button onClick={() => deleteComment(comment.id)}>REMOVE</Button>
        </div>
      ))}
    </div>
  );
}

export default ManageComments;
