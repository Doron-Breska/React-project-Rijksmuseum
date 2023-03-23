import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React from "react";
import Button from "react-bootstrap/Button";

// import { HandThumbsUp } from "react-bootstrap-icons";

function NewCard({ paintings }) {
  console.log("test-test", paintings);

  return (
    <>
      {paintings.map((paint) => {
        return (
          <Card
            style={{ width: "60%", margin: "0 auto" }}
            key={paint.id}
            className="bg-dark text-white my-3"
          >
            <Card.Img src={paint.webImage.url} alt="Card image">
              <Card.ImgOverlay>
                <Card.Title>{paint.title}</Card.Title>
              </Card.ImgOverlay>
            </Card.Img>
            <Card.Body>
              <Card.Text>{paint.longTitle}</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
}

export default NewCard;
