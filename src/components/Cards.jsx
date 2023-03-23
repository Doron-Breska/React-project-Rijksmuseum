import React from "react";
import Card from "react-bootstrap/Card";
import { BsFillHeartFill } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { BsChatSquareTextFill } from "react-icons/bs";
import { BsShareFill } from "react-icons/bs";

function Cards({ paintings }) {
  const [numLikes, SetNumofLikes] = useState(0);
  const [numComments, SetNumComments] = useState(0);

  console.log("test-test", paintings);
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
              <Button variant="secondary">
                <BsChatSquareTextFill />
              </Button>
              <Button variant="secondary">
                <BsShareFill />
              </Button>
            </Card.Text>
          </Card>
        );
      })}
    </>
  );
}

export default Cards;
