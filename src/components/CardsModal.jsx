import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import {
  BsFillHeartFill,
  BsChatSquareTextFill,
  BsShareFill,
} from "react-icons/bs";
import Button from "react-bootstrap/Button";
import ModalBack from "./ModalBack";

function CardsModal({ paintings }) {
  const [numLikes, setNumofLikes] = useState(0);
  const [numComments, setNumComments] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [selectedPainting, setSelectedPainting] = useState({});

  function handleCommentsClick(paint) {
    setSelectedPainting(paint);
    setShowComments(true);
  }

  function handleCloseComments() {
    setSelectedPainting(null);
    setShowComments(false);
  }

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
                {numLikes} - <BsFillHeartFill />
                <br />
                {numComments} - <BsChatSquareTextFill />
              </Button>
              <Card.Title className="bg-secondary d-inline px-1">
                {paint.title}
              </Card.Title>
            </Card.ImgOverlay>
            <Card.Text className="text-center">{paint.longTitle}</Card.Text>
            <Card.Text className="d-flex justify-content-between">
              <Button variant="secondary">
                <BsFillHeartFill />
              </Button>
              <Button
                id="comments"
                variant="secondary"
                onClick={() => handleCommentsClick(paint)}
              >
                <BsChatSquareTextFill />
              </Button>
              <Button variant="secondary">
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
      />
    </>
  );
}

export default CardsModal;
