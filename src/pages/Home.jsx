import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";

function Home() {
  const [paintings, setPaintings] = useState([]);
  const [loading, SetLoading] = useState(true);

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await fetch(
          "https://www.rijksmuseum.nl/api/en/collection?key=cQfuqm3K&toppieces=True&ps=100&imgonly=true"
        );
        const result = await response.json();
        setPaintings(result.artObjects);
        SetLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchPaintings();
  }, []);
  console.log(paintings);

  return (
    <div className="paintings-container">
      {loading && <h1 className="text-center m-1 ">LOADING...</h1>}
      <Cards paintings={paintings} />
    </div>
  );
}

export default Home;
