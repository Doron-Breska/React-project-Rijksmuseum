import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import Filters from "../components/Filters";

function Home() {
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectArtist, setSelectArtist] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchPaintings = async () => {
      try {
        const response = await fetch(
          `https://www.rijksmuseum.nl/api/en/collection?key=cQfuqm3K&toppieces=True&ps=10&imgonly=true&involvedMaker=${selectArtist}`
        );
        const result = await response.json();
        setPaintings(result.artObjects);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchPaintings();
  }, [selectArtist]);
  console.log("the results of the fetch", paintings);

  ///creatig set of unique painters from the initial fetch
  const artistsSet = new Set();
  for (let paint of paintings) {
    artistsSet.add(paint.principalOrFirstMaker);
  }
  const arrayArtists = Array.from(artistsSet);

  /// function to take the select input value
  function handleSelect(value) {
    setSelectArtist(value.replace(" ", "+"));
    console.log("test of handleSelect updated value", value.replace(" ", "+"));
  }

  return (
    <>
      {loading && <h1 className="text-center m-1">LOADING...</h1>}
      <Filters onSelect={handleSelect} arrayArtists={arrayArtists} />
      <div className="paintings-container">
        <Cards paintings={paintings} />
      </div>
    </>
  );
}

export default Home;
