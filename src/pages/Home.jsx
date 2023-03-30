import React, { useEffect, useState } from "react";
// import Cards from "../components/Cards";
import Filters from "../components/Filters";
import CardsModal from "../components/CardsModal";

function Home() {
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectArtist, setSelectArtist] = useState("");
  const [artistsSet, setArtistsSet] = useState(new Set());

  useEffect(() => {
    setLoading(true);
    const fetchPaintings = async () => {
      try {
        const response = await fetch(
          `https://www.rijksmuseum.nl/api/en/collection?key=cQfuqm3K&toppieces=True&ps=100&imgonly=true&involvedMaker=${selectArtist}`
        );
        const result = await response.json();
        setPaintings(result.artObjects);
        if (artistsSet.size === 0) {
          const newArtistsSet = new Set();
          for (let paint of result.artObjects) {
            newArtistsSet.add(paint.principalOrFirstMaker);
          }
          setArtistsSet(newArtistsSet);
        }
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchPaintings();
  }, [selectArtist]);
  console.log("the results of the fetch", paintings);

  function handleSelect(value) {
    setSelectArtist(value.replace(" ", "+"));
    console.log("test of handleSelect updated value", value.replace(" ", "+"));
  }

  return (
    <>
      {loading && <h1 className="text-center m-1">LOADING...</h1>}
      <Filters onSelect={handleSelect} arrayArtists={Array.from(artistsSet)} />
      <div className="paintings-container">
        <CardsModal paintings={paintings} />
      </div>
    </>
  );
}

export default Home;
