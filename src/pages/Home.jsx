import React, { useEffect, useState } from "react";

function Home() {
  const [paintings, setPaintings] = useState([]);
  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await fetch(
          "https://www.rijksmuseum.nl/api/en/collection?key=cQfuqm3K&ps=100https://www.rijksmuseum.nl/api/en/collection?key=cQfuqm3K&ps=100&imgonly=true"
        );
        const result = await response.json();
        setPaintings(result.artObjects);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchPaintings();
  }, []);
  console.log(paintings);

  return (
    <div>
      <h2>All Paintings :</h2>
      {paintings.map((paint) => {
        return (
          <div key={paint.id}>
            <h3>{paint.title}</h3>
            <img className="paint" src={paint.webImage.url} alt="" />
            <p>{paint.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
